import "./Card.css"

export default () => {

    return (
        <div>
            <section class="cards">
                <article className="oneCard">
                    <div class="article-wrapper">
                        <div class="article-body">
                            <h2 className="cardTitle">This is some title</h2>
                            <p className="cardText">
                                Curabitur convallis ac quam vitae laoreet. Nulla mauris ante, euismod sed lacus sit amet, congue bibendum eros. Etiam mattis lobortis porta. Vestibulum ultrices iaculis enim imperdiet egestas.
                            </p>
                        </div>
                    </div>
                </article>
                <article className="oneCard">
                    <div class="article-wrapper">
                        <div class="article-body">
                            <h2 className="cardTitle">This is some title</h2>
                            <p className="cardText">
                                Curabitur convallis ac quam vitae laoreet. Nulla mauris ante, euismod sed lacus sit amet, congue bibendum eros. Etiam mattis lobortis porta. Vestibulum ultrices iaculis enim imperdiet egestas.
                            </p>
                        </div>
                    </div>
                </article>
            </section>
            
        </div>
    )
}