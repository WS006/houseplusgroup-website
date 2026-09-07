import json, re, time
from concurrent.futures import ThreadPoolExecutor, as_completed
from pathlib import Path
from openai import OpenAI

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'audit/article-translation'
source = json.loads((OUT / 'source.json').read_text())
translated = json.loads((OUT / 'translated-by-ai.json').read_text())
client = OpenAI()
reviewer = 'gemini-3.1-pro-preview'

def parse_json(text):
    text = re.sub(r'^```(?:json)?\s*|\s*```$', '', (text or '').strip(), flags=re.I)
    a, b = text.find('{'), text.rfind('}')
    if a < 0 or b <= a: raise ValueError('no JSON object')
    return json.loads(text[a:b+1])

system = '''You are an independent senior editor reviewing multilingual B2B technical content. Compare the English source with the proposed Spanish, German, French, and Modern Standard Arabic translations. Correct mistranslations, omissions, unnatural technical terminology, changed numbers/units, altered URLs/slugs, unsupported claims, or leftover English body text. Preserve the exact source object shape and all factual boundaries. Return JSON only with keys "translations" and "review". translations must contain exactly es/de/fr/ar objects with the same keys and array lengths as the source. review must contain passed (boolean) and issues (array of concise strings). Do not rewrite the English source.'''

def call(slug):
    payload = {'source': source[slug], 'translations': translated[slug]}
    for attempt in range(4):
        try:
            r = client.chat.completions.create(model=reviewer, max_tokens=30000, messages=[{'role':'system','content':system},{'role':'user','content':json.dumps(payload, ensure_ascii=False)}])
            content = r.choices[0].message.content if r.choices else None
            if content: return slug, parse_json(content)
            raise ValueError('empty model content')
        except Exception as e:
            if attempt == 3: raise
            print(f'retry {slug} {attempt+1}: {e}', flush=True)
            time.sleep(2 ** attempt)

reviewed = {}
with ThreadPoolExecutor(max_workers=1) as pool:
    fs = [pool.submit(call, slug) for slug in translated]
    for f in as_completed(fs):
        slug, result = f.result()
        reviewed[slug] = result
        print(f'reviewed {slug}: {result.get("review", {}).get("passed")}', flush=True)

(OUT / 'reviewed-by-ai.json').write_text(json.dumps(reviewed, ensure_ascii=False, indent=2))
