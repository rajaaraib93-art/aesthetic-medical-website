import Link from 'next/link'
export default function NotFound(){return <div className="section"><div className="container" style={{textAlign:'center'}}><div className="kicker">404</div><h1>Page not found</h1><p>The requested page does not exist.</p><Link href="/" className="btn btn-primary">Back home</Link></div></div>}
