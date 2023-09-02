import "./style.css"



function AvaliacãoPopulação() {

return(
    <form method='post'>

    <div className="container">
    <div className="segundoContainer">
        <div className="terceiroContainer">

        <h1 className="titulo">Avaliacão População</h1>
        <label className="label">Lançamento de detritos (lixo/entulho) dentro ou nas margens dos rios</label>
        <input type="number" name="Lançamento de detritos" required className="input"></input>
        <label className="label">Rede de esgoto sanitário</label>
        <input type="number"  name="Rede de esgoto sanitário" required className="input"></input>
        <label className="label">Rede de águas pluviais</label>
        <input type="number"  name="Rede de águas pluviais" required className="input"></input>
        <label className="label">Existência de obras de estabilização</label>
        <input type="number" name="Existência de obras de estabilização" min="0" max="10" required className="input"></input>
        <label className="label">Localização</label>
        <input type="text" name="localização" required className="input"></input>
        <label className="label">Bairro</label>
        <input type="text" name="bairro" required className="input"></input>
        <label className="label">Endereço</label>
        <input type="text" name="endereço" required className="input"></input>
        
       
        <div className="buttonContainer">
        <button className="button">FINALIZAR</button>
        <button className="button">CANCELAR</button>
        </div>
        </div>

    </div>
</div>
    </form>




);

}


export default AvaliacãoPopulação;