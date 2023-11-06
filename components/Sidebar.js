import Link from 'next/link'
 
function Sidebar() {
  return (
    <aside id="sidebar" className="sidebar">
      <ul className="sidebar-nav" id="sidebar-nav">

        <li className="nav-item">
          <a className="nav-link collapsed" href="/">
            <i className="bi bi-grid"></i>
            <span>Dashboard</span>
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link collapsed" href="/policy">
            <i className="bi bi-grid"></i>
            <span>Policy</span>
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link collapsed" href="/csvStepper">
            <i className="bi bi-grid"></i>
            <span>CSV Mapping</span>
          </a>
        </li>       
      </ul>
    </aside>
  )
}
 
export default Sidebar