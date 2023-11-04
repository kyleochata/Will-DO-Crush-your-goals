
import "../Card/card.css"
import Checkbox from "../TaskComponents/Checkbox"

export default () => {

    return (
        <div>
            <section class="cards">
                <article className="oneCard">
                            <h2 className="cardTitle">TASKS</h2>
                            <ul className="cardText">
                                <li className="liItem">The list of Tasks for this user would go here
                                <Checkbox /></li>
                            </ul>
                            <ul className="cardText">
                                <li className="liItem">The list of Tasks for this user would go here
                                <Checkbox /></li>
                            </ul>
                            <ul className="cardText">
                                <li className="liItem">The list of Tasks for this user would go here
                                <Checkbox /></li>
                            </ul>
                            <ul className="cardText">
                                <li className="liItem">The list of Tasks for this user would go here
                                <Checkbox /></li>
                            </ul>
                            <ul className="cardText">
                                <li className="liItem">The list of Tasks for this user would go here
                                <Checkbox /></li>
                            </ul>
                            <ul className="cardText">
                                <li className="liItem">The list of Tasks for this user would go here
                                <Checkbox /></li>
                            </ul>
                </article>
                <article className="oneCard">
                            <h2 className="cardTitle">GOALS</h2>
                            <ul className="cardText">
                                <li className="liItem">The list of Goals for this user would go here
                                <Checkbox /></li>
                                <li className="liItem">The list of Goals for this user would go here
                                <Checkbox /></li>
                                
                            </ul>
                </article>
            </section>
        </div>
    )
}