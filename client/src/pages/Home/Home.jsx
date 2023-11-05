import { useAuth0 } from '@auth0/auth0-react'
import './Home.css'
import Dashboard from '../../components/Dashboard/Dashboard.jsx'
import phone from '../../assets/phone.png'
import mountain from '../../assets/mountain.png'

export default () => {
  const { loginWithRedirect, isAuthenticated, user } = useAuth0()

  return (
    <section className="homeMain">
      {!isAuthenticated ? (
        <div>
          <div className="fullColor">
            <div className="heroSection1">
              <div className="section1Left">
                <img src={phone} className="phoneImage" />
              </div>
              <div className="section1Right">
                <div className="crush">
                  <div>CRUSH.</div>
                  <div>YOUR.</div>
                  <div>GOALS.</div>
                </div>

                <button
                  className="login"
                  onClick={() => loginWithRedirect({ screen_hint: 'signup' })}
                >
                  Sign up - It's Free!
                </button>
              </div>
            </div>
          </div>

          <div className="heroSection2">
            <div className="section2Left">
              <h1 className="section2Header">
                Managing your Goals and Tasks is tough.
              </h1>
              <h2 className="section2SubHeader">
                Craft, organize, and oversee all the essentials required to
                consistently level up
              </h2>
              <ul className="section2List">
                <li>Create SMART goals</li>
                <li>Create individual tasks</li>
                <ul>
                  <li>assign to a goal</li>
                  <li>assign to other users</li>
                  <li>create one-offs</li>
                </ul>
                <li>View reports</li>
                <ul>
                  <li>upcoming deadlines</li>
                  <li>completion percentages</li>
                </ul>
                <li>Track deadlines with calendar view</li>
                <li>Set priorities with daily power lists</li>
              </ul>
            </div>

            <div className="section2Right">
              <img src={mountain} className="mountain" />
            </div>
          </div>
        </div>
      ) : (
        <Dashboard />
      )}
    </section>
  )
}
