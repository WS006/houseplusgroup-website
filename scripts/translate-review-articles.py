import json, os, re, sys, time
from concurrent.futures import ThreadPoolExecutor, as_completed
from pathlib import Path
from openai import OpenAI

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / 'audit/article-translation/source.json'
OUT = ROOT / 'audit/article-translation'
TARGETS = ['es', 'de', 'fr', 'ar']
TRANSLATOR = 'gpt-5-mini'
REVIEWER = 'gemini-3.1-pro-preview'

source = json.loads(SOURCE.read_text())
client = OpenAI()

def json_text(value):
    text = value.strip()
    text = re.sub(r'^```(?:json)?\s*', '', text, flags=re.I)
    text = re.sub(r'\s*```$', '', text)
    start, end = text.find('{'), text.rfind('}')
    if start < 0 or end <= start:
        raise ValueError('model did not return a JSON object')
    return json.loads(text[start:end+1])

def call(model, system, user, max_tokens):
    kwargs = dict(model=model, messages=[{'role':'system','content':system},{'role':'user','content':user}])
    if model.startswith('gpt-'):
        kwargs['max_completion_tokens'] = max_tokens
    else:
        kwargs['max_tokens'] = max_tokens
    response = client.chat.completions.create(**kwargs)
    return json_text(response.choices[0].message.content)

translator_system = '''You are a senior technical B2B website translator. Translate the supplied English article object into Spanish (es), German (de), French (fr), and Modern Standard Arabic (ar). Return JSON only with exactly these four top-level locale keys. Under each locale, preserve the exact object shape, array lengths, keys, slugs, URLs, image paths, dates, numbers, units, product model names, standards, and factual commercial boundaries. Translate every human-facing string, including title, description, keywords, category, heroImageAlt, authorRole, readingTime, section headings and paragraphs, FAQ questions and answers, related article title/excerpt, and video name/description/transcript/caption text. Do not add claims, certifications, prices, MOQ, delivery promises, performance guarantees, or citations. Keep HousePlus, RFQ, OEM/ODM, USB-C, LiFePO4, BESS, Incoterm, and model codes unchanged where appropriate. Use professional native B2B terminology.''' 

reviewer_system = '''You are an independent senior editor reviewing multilingual B2B technical content. Compare the English source object with the proposed Spanish, German, French, and Modern Standard Arabic translations. Correct mistranslations, omissions, unnatural technical terminology, changed numbers/units, altered URLs/slugs, unsupported claims, or leftover English body text. Preserve the exact source object shape and all factual boundaries. Return JSON only with keys "translations" and "review". "translations" must contain exactly es/de/fr/ar objects with the same keys and array lengths as the source. "review" must contain "passed" (boolean) and "issues" (array of concise strings). Do not rewrite the English source.'''

def translate_one(item):
    slug, article = item
    prompt = 'SOURCE ARTICLE JSON:\n' + json.dumps(article, ensure_ascii=False)
    result = call(TRANSLATOR, translator_system, prompt, 20000)
    for locale in TARGETS:
        if locale not in result:
            raise ValueError(f'{slug}: translator missing {locale}')
    return slug, result

translated = {}
with ThreadPoolExecutor(max_workers=2) as pool:
    futures = [pool.submit(translate_one, item) for item in source.items()]
    for future in as_completed(futures):
        slug, result = future.result()
        translated[slug] = result
        print(f'translated {slug}', flush=True)

(OUT / 'translated-by-ai.json').write_text(json.dumps(translated, ensure_ascii=False, indent=2))

reviewed = {}
def review_one(item):
    slug, proposed = item
    payload = {'source': source[slug], 'translations': proposed}
    result = call(REVIEWER, reviewer_system, json.dumps(payload, ensure_ascii=False), 24000)
    if 'translations' not in result or 'review' not in result:
        raise ValueError(f'{slug}: reviewer response missing keys')
    return slug, result

with ThreadPoolExecutor(max_workers=2) as pool:
    futures = [pool.submit(review_one, item) for item in translated.items()]
    for future in as_completed(futures):
        slug, result = future.result()
        reviewed[slug] = result
        print(f'reviewed {slug}: {result.get("review", {}).get("passed")}', flush=True)

(OUT / 'reviewed-by-ai.json').write_text(json.dumps(reviewed, ensure_ascii=False, indent=2))
print(f'Completed {len(reviewed)} articles x {len(TARGETS)} locales with {TRANSLATOR} + {REVIEWER}')
