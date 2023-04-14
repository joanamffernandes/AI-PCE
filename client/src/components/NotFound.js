import "./NotFound.css"

function NotFound() {


    return (
        <div className="container mt-5 not-found-page ">
            <img className="icon" loading="lazy" src="/info_error.png" alt="Atenção"/>
            <div className="mt-4">
                <h1 className="title">Diagnóstico: a página não existe.</h1>

                <p>Infelizmente, não encontramos o conteúdo que procura.<br/>O nosso check-up indica que:</p>

                <ul>
                    <li>A página pode ter sido entretanto removida;</li>
                    <li>O endereço URL pode estar incorreto.</li>
                </ul>

                <a href="/"><span className="txt-link">Ir para homepage</span></a>
            </div>
        </div>

    );
}

export default NotFound;
