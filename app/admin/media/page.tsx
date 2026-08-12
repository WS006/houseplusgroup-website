'use client';

import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { Check, ChevronRight, FileImage, Filter, FolderOpen, ImagePlus, Loader2, RefreshCw, Search, ShieldCheck, Sparkles, Tags, Upload, X } from 'lucide-react';

type AssetStatus = 'draft' | 'needs_review' | 'approved' | 'deprecated' | 'archived';

type Asset = {
  asset_id: string;
  r2_key: string;
  original_filename: string;
  content_type: string;
  byte_size: number;
  width?: number | null;
  height?: number | null;
  topic?: string | null;
  status: AssetStatus;
  focal_x: number;
  focal_y: number;
  seo_indexable: number | boolean;
  alt_text?: string | null;
  title?: string | null;
  caption?: string | null;
  description?: string | null;
  created_at: string;
  updated_at: string;
};

const statusMeta: Record<AssetStatus, { label: string; className: string }> = {
  draft: { label: 'Draft', className: 'bg-slate-100 text-slate-700 ring-slate-200' },
  needs_review: { label: 'Needs review', className: 'bg-amber-100 text-amber-800 ring-amber-200' },
  approved: { label: 'Approved', className: 'bg-emerald-100 text-emerald-800 ring-emerald-200' },
  deprecated: { label: 'Deprecated', className: 'bg-rose-100 text-rose-800 ring-rose-200' },
  archived: { label: 'Archived', className: 'bg-slate-200 text-slate-600 ring-slate-300' },
};

function formatBytes(value: number) {
  if (!value) return '0 B';
  const units = ['B', 'KB', 'MB', 'GB'];
  const index = Math.min(Math.floor(Math.log(value) / Math.log(1024)), units.length - 1);
  return `${(value / 1024 ** index).toFixed(index ? 1 : 0)} ${units[index]}`;
}

function assetUrl(assetId: string) {
  return `/api/media-library/v1/assets/${assetId}/file`;
}

export default function MediaLibraryPage() {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [status, setStatus] = useState<AssetStatus>('needs_review');
  const [page, setPage] = useState(1);
  const [totalAssets, setTotalAssets] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<Asset | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const [showUpload, setShowUpload] = useState(false);
  const [uploadTopic, setUploadTopic] = useState('products');

  async function loadAssets(nextStatus = status, nextPage = page, nextQuery = query) {
    setLoading(true);
    setNotice(null);
    try {
      const response = await fetch(`/api/media-library/v1/assets?status=${nextStatus}&page=${nextPage}&limit=100&q=${encodeURIComponent(nextQuery.trim())}`, { cache: 'no-store' });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Unable to load media assets');
      setAssets(data.assets || []);
      setTotalAssets(Number(data.total || 0));
      setHasMore(Boolean(data.has_more));
      setSelected((current) => data.assets?.find((asset: Asset) => asset.asset_id === current?.asset_id) || null);
    } catch (error) {
      setNotice(error instanceof Error ? error.message : 'Unable to load media assets');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { loadAssets(); }, []);

  const filtered = assets;

  async function saveAsset(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!selected) return;
    const form = new FormData(event.currentTarget);
    setSaving(true);
    setNotice(null);
    const payload = {
      topic: String(form.get('topic') || 'uncategorized').trim(),
      status: form.get('status') as AssetStatus,
      seo_indexable: form.get('seo_indexable') === 'on',
      focal_x: Number(form.get('focal_x') || 0.5),
      focal_y: Number(form.get('focal_y') || 0.5),
      copyright_owner: String(form.get('copyright_owner') || '').trim() || null,
      license_scope: String(form.get('license_scope') || '').trim() || null,
      source_url: String(form.get('source_url') || '').trim() || null,
      translation: {
        locale: 'en',
        alt_text: String(form.get('alt_text') || '').trim(),
        title: String(form.get('title') || '').trim(),
        caption: String(form.get('caption') || '').trim(),
        description: String(form.get('description') || '').trim(),
      },
    };
    const relation = {
      entity_type: String(form.get('entity_type') || 'page'),
      entity_id: String(form.get('entity_id') || '').trim(),
      role: String(form.get('role') || 'inline'),
      canonical_url: String(form.get('canonical_url') || '').trim(),
    };
    try {
      const response = await fetch(`/api/media-library/v1/assets/${selected.asset_id}`, { method: 'PATCH', headers: { 'content-type': 'application/json' }, body: JSON.stringify(payload) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Unable to update asset');
      const shouldSaveRelation = Boolean(relation.entity_id && relation.canonical_url);
      if (shouldSaveRelation) {
        const relationResponse = await fetch(`/api/media-library/v1/assets/${selected.asset_id}/relations`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(relation) });
        const relationData = await relationResponse.json();
        if (!relationResponse.ok) throw new Error(relationData.error || 'Unable to save page relation');
      }
      setNotice(`Saved ${selected.original_filename}${shouldSaveRelation ? ' and linked it to its canonical page.' : ''}.`);
      await loadAssets(status, page);
    } catch (error) {
      setNotice(error instanceof Error ? error.message : 'Unable to update asset');
    } finally {
      setSaving(false);
    }
  }

  async function uploadAsset(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setNotice(null);
    try {
      const response = await fetch('/api/media-library/v1/upload', {
        method: 'POST',
        headers: { 'content-type': file.type, 'x-filename': file.name, 'x-topic': uploadTopic },
        body: file,
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Unable to upload image');
      setNotice(`${file.name} uploaded as a draft asset.`);
      setShowUpload(false);
      setStatus('draft');
      setPage(1);
      await loadAssets('draft', 1);
    } catch (error) {
      setNotice(error instanceof Error ? error.message : 'Unable to upload image');
    } finally {
      setUploading(false);
      event.target.value = '';
    }
  }

  const reviewed = assets.filter((asset) => asset.status === 'approved').length;
  const pageStart = totalAssets ? (page - 1) * 100 + 1 : 0;
  const pageEnd = Math.min((page - 1) * 100 + assets.length, totalAssets);

  return (
    <main className="min-h-screen bg-[#f5f7fb] text-slate-900">
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-[1500px] px-5 py-7 md:px-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#f97316] to-[#dc2626] text-white shadow-lg shadow-orange-200"><FolderOpen size={24} /></div>
              <div>
                <div className="mb-1 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-orange-600"><Sparkles size={13} /> HousePlus operations</div>
                <h1 className="text-2xl font-black tracking-tight md:text-3xl">Media library</h1>
                <p className="mt-1 max-w-2xl text-sm text-slate-500">Review R2 assets, control image SEO metadata, and publish only approved media into pages, structured data, and image sitemaps.</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <button onClick={() => loadAssets()} className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"><RefreshCw size={16} /> Refresh</button>
              <button onClick={() => setShowUpload(true)} className="inline-flex items-center gap-2 rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-bold text-white shadow-lg shadow-slate-300 transition hover:bg-slate-800"><ImagePlus size={17} /> Add media</button>
            </div>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
              <Metric label="Assets in workflow" value={totalAssets} icon={<FileImage size={17} />} />
            <Metric label="Visible in filter" value={filtered.length} icon={<Filter size={17} />} />
            <Metric label="Approved here" value={reviewed} icon={<Check size={17} />} />
            <Metric label="Publication rule" value="Alt + approval" icon={<ShieldCheck size={17} />} compact />
          </div>
        </div>
      </section>

      <div className="mx-auto grid max-w-[1500px] gap-6 px-5 py-6 md:px-8 xl:grid-cols-[minmax(0,1fr)_420px]">
        <section className="min-w-0">
          <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <form onSubmit={(event) => { event.preventDefault(); setPage(1); loadAssets(status, 1, query); }} className="relative max-w-xl flex-1"><Search className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search filename, key, topic, title, or alt text" className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-24 text-sm outline-none transition focus:border-orange-400 focus:ring-4 focus:ring-orange-100" /><button type="submit" className="absolute right-1.5 top-1.5 rounded-lg bg-slate-950 px-3 py-1.5 text-xs font-bold text-white hover:bg-slate-800">Search</button></form>
            <div className="flex items-center gap-2 text-sm font-semibold text-slate-600"><Filter size={16} /><select value={status} onChange={(event) => { const next = event.target.value as AssetStatus; setStatus(next); setPage(1); loadAssets(next, 1); }} className="rounded-xl border border-slate-200 bg-white px-3 py-3 outline-none focus:border-orange-400"><option value="needs_review">Needs review</option><option value="draft">Draft</option><option value="approved">Approved</option><option value="deprecated">Deprecated</option><option value="archived">Archived</option></select></div>
          </div>

          {notice && <div className="mb-5 flex items-start justify-between gap-3 rounded-xl border border-orange-200 bg-orange-50 px-4 py-3 text-sm font-medium text-orange-900"><span>{notice}</span><button onClick={() => setNotice(null)} aria-label="Dismiss message"><X size={17} /></button></div>}

          {loading ? <div className="flex min-h-[360px] items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white text-slate-500"><Loader2 className="mr-3 animate-spin" size={20} /> Loading media assets…</div> : filtered.length === 0 ? <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-8 py-20 text-center"><FileImage className="mx-auto mb-3 text-slate-300" size={38} /><h2 className="font-bold">No matching media</h2><p className="mt-1 text-sm text-slate-500">Change the filter or upload a new asset to begin review.</p></div> : <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5">
            {filtered.map((asset) => <button key={asset.asset_id} onClick={() => setSelected(asset)} className={`group overflow-hidden rounded-2xl border bg-white text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg ${selected?.asset_id === asset.asset_id ? 'border-orange-500 ring-4 ring-orange-100' : 'border-slate-200'}`}>
              <div className="relative aspect-[4/3] overflow-hidden bg-slate-100"><img src={assetUrl(asset.asset_id)} alt={asset.alt_text || asset.original_filename} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" /><span className={`absolute left-2 top-2 rounded-full px-2 py-1 text-[10px] font-extrabold uppercase tracking-wide ring-1 ${statusMeta[asset.status].className}`}>{statusMeta[asset.status].label}</span></div>
              <div className="p-3"><p className="truncate text-sm font-bold text-slate-800">{asset.original_filename}</p><p className="mt-1 truncate text-xs text-slate-500">{asset.topic || 'Uncategorized'} · {formatBytes(asset.byte_size)}</p><p className="mt-2 line-clamp-2 min-h-8 text-xs leading-4 text-slate-500">{asset.alt_text || 'Alt text required before approval'}</p></div>
            </button>)}
          </div>}
          {!loading && assets.length > 0 && <div className="mt-6 flex flex-col gap-3 border-t border-slate-200 pt-5 text-sm sm:flex-row sm:items-center sm:justify-between"><p className="font-medium text-slate-500">Showing {pageStart}–{pageEnd} of {totalAssets} assets</p><div className="flex gap-2"><button disabled={page === 1} onClick={() => { const previous = page - 1; setPage(previous); loadAssets(status, previous); }} className="rounded-xl border border-slate-200 bg-white px-3 py-2 font-bold text-slate-700 disabled:cursor-not-allowed disabled:opacity-40">Previous</button><button disabled={!hasMore} onClick={() => { const next = page + 1; setPage(next); loadAssets(status, next); }} className="inline-flex items-center gap-1 rounded-xl border border-slate-200 bg-white px-3 py-2 font-bold text-slate-700 disabled:cursor-not-allowed disabled:opacity-40">Next <ChevronRight size={16} /></button></div></div>}
        </section>

        <aside className="xl:sticky xl:top-5 xl:h-fit">
          {selected ? <form onSubmit={saveAsset} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-100 p-5"><div className="mb-3 flex items-start justify-between gap-3"><div><p className="text-xs font-bold uppercase tracking-[0.16em] text-orange-600">Asset inspector</p><h2 className="mt-1 break-all text-base font-extrabold text-slate-900">{selected.original_filename}</h2></div><span className={`shrink-0 rounded-full px-2 py-1 text-[10px] font-extrabold uppercase ring-1 ${statusMeta[selected.status].className}`}>{statusMeta[selected.status].label}</span></div><div className="aspect-[16/9] overflow-hidden rounded-xl bg-slate-100"><img src={assetUrl(selected.asset_id)} alt={selected.alt_text || selected.original_filename} className="h-full w-full object-contain" /></div><p className="mt-3 truncate text-xs text-slate-500">R2: {selected.r2_key}</p></div>
            <div className="space-y-4 p-5"><Field label="Topic"><input name="topic" defaultValue={selected.topic || ''} className="field" placeholder="products, articles, brand…" /></Field><div className="grid grid-cols-2 gap-3"><Field label="Workflow status"><select name="status" defaultValue={selected.status} className="field"><option value="draft">Draft</option><option value="needs_review">Needs review</option><option value="approved">Approved</option><option value="deprecated">Deprecated</option><option value="archived">Archived</option></select></Field><Field label="Copyright owner"><input name="copyright_owner" className="field" placeholder="HousePlus" /></Field></div><Field label="English alt text"><textarea name="alt_text" defaultValue={selected.alt_text || ''} required rows={3} className="field" placeholder="Describe the image precisely and naturally" /></Field><Field label="SEO title"><input name="title" defaultValue={selected.title || ''} className="field" placeholder="Concise image title" /></Field><Field label="Caption"><input name="caption" defaultValue={selected.caption || ''} className="field" placeholder="Optional visible caption" /></Field><Field label="Description for GEO"><textarea name="description" defaultValue={selected.description || ''} rows={3} className="field" placeholder="Factual context for AI and structured data" /></Field><div className="grid grid-cols-2 gap-3"><Field label="Focal X"><input name="focal_x" type="number" min="0" max="1" step="0.01" defaultValue={selected.focal_x} className="field" /></Field><Field label="Focal Y"><input name="focal_y" type="number" min="0" max="1" step="0.01" defaultValue={selected.focal_y} className="field" /></Field></div><Field label="Source URL"><input name="source_url" type="url" className="field" placeholder="Optional original/source URL" /></Field><fieldset className="space-y-3 rounded-xl border border-slate-200 bg-slate-50 p-3"><legend className="px-1 text-sm font-bold text-slate-700">Publication relation</legend><p className="text-xs leading-5 text-slate-500">Add the canonical page where this image is used. This is required for approved, indexable media to enter the dedicated image sitemap.</p><div className="grid grid-cols-2 gap-3"><Field label="Entity type"><select name="entity_type" defaultValue="page" className="field"><option value="page">Page</option><option value="product">Product</option><option value="article">Article</option><option value="brand">Brand</option><option value="team_member">Team member</option><option value="factory">Factory</option><option value="document">Document</option></select></Field><Field label="Display role"><select name="role" defaultValue="inline" className="field"><option value="page_hero">Page hero</option><option value="product_primary">Product primary</option><option value="product_gallery">Product gallery</option><option value="article_hero">Article hero</option><option value="card">Card</option><option value="open_graph">Open Graph</option><option value="inline">Inline</option></select></Field></div><Field label="Content ID"><input name="entity_id" className="field" placeholder="e.g. solar-panel-500w" /></Field><Field label="Canonical page URL"><input name="canonical_url" type="url" className="field" placeholder="https://www.houseplus-ch.com/en/products/..." /></Field></fieldset><label className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm font-semibold text-slate-700"><input name="seo_indexable" type="checkbox" defaultChecked={Boolean(selected.seo_indexable)} className="h-4 w-4 rounded border-slate-300 text-orange-600 focus:ring-orange-500" /> Include in image SEO output</label><button disabled={saving} className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-950 px-4 py-3 font-bold text-white transition hover:bg-slate-800 disabled:bg-slate-400">{saving ? <Loader2 className="animate-spin" size={17} /> : <Check size={17} />}{saving ? 'Saving…' : 'Save asset review'}</button><p className="text-center text-[11px] leading-4 text-slate-400">Approval requires English alt text. Only approved, indexable, page-linked assets enter the media sitemap.</p></div>
          </form> : <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-7 py-16 text-center"><Tags className="mx-auto mb-3 text-slate-300" size={34} /><h2 className="font-bold text-slate-800">Select an asset</h2><p className="mt-2 text-sm leading-6 text-slate-500">Inspect the image, write SEO/GEO metadata, select a workflow status, then publish it deliberately.</p></div>}
        </aside>
      </div>

      {showUpload && <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-5"><div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl"><div className="flex items-start justify-between"><div><p className="text-xs font-bold uppercase tracking-[0.16em] text-orange-600">R2 intake</p><h2 className="mt-1 text-xl font-black">Add media asset</h2></div><button onClick={() => setShowUpload(false)} className="rounded-lg p-2 text-slate-400 hover:bg-slate-100"><X size={20} /></button></div><p className="mt-3 text-sm leading-6 text-slate-500">Uploads are stored as drafts. Add an accurate English alt text and approve the asset before it becomes eligible for SEO and GEO publication.</p><label className="mt-5 block text-sm font-bold text-slate-700">Initial topic<select value={uploadTopic} onChange={(event) => setUploadTopic(event.target.value)} className="field mt-2"><option value="products">Products</option><option value="articles">Articles</option><option value="brand">Brand</option><option value="factory">Factory</option><option value="team">Team</option><option value="documents">Documents</option></select></label><label className="mt-5 flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 px-6 py-10 text-center transition hover:border-orange-400 hover:bg-orange-50"><Upload className="mb-3 text-orange-500" size={28} /><span className="font-bold text-slate-800">{uploading ? 'Uploading to R2…' : 'Choose an image to upload'}</span><span className="mt-1 text-xs text-slate-500">JPEG, PNG, WebP, GIF or SVG</span><input disabled={uploading} type="file" accept="image/jpeg,image/png,image/webp,image/gif,image/svg+xml" className="sr-only" onChange={uploadAsset} /></label></div></div>}

      <style jsx global>{`.field{width:100%;border-radius:.75rem;border:1px solid #e2e8f0;background:#fff;padding:.65rem .75rem;font-size:.875rem;line-height:1.25rem;color:#0f172a;outline:none}.field:focus{border-color:#fb923c;box-shadow:0 0 0 3px #ffedd5}.field::placeholder{color:#94a3b8}`}</style>
    </main>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="block text-sm font-bold text-slate-700"><span className="mb-1.5 block">{label}</span>{children}</label>;
}

function Metric({ label, value, icon, compact = false }: { label: string; value: string | number; icon: React.ReactNode; compact?: boolean }) {
  return <div className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-3"><div className="flex items-center gap-2 text-xs font-semibold text-slate-500">{icon}{label}</div><p className={`mt-1 font-black text-slate-900 ${compact ? 'text-sm' : 'text-xl'}`}>{value}</p></div>;
}
