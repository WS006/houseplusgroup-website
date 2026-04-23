export default function LangHome({ params }: { params: { lang: string } }) {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Language Page Test</h1>
      <p>Current language: <strong>{params.lang}</strong></p>
      <p>If you see this, dynamic routing for /[lang] is working.</p>
    </div>
  );
}
