import Link from 'next/link'
 
function Sidebar() {
  return (
    <ul>
      <li>
        <Link href="/">Dashboard</Link>
      </li>
      <li>
        <Link href="/policy">Policy</Link>
      </li>
    </ul>
  )
}
 
export default Sidebar