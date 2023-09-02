import "./style.css";


function FormularioPontosApoio () {

    return (
        <div className="container">
            <div className="segundoContainer">
                <div className="terceiroContainer">

                <h1 className="titulo">Cadastro de Pontos de Apoio</h1>
                <label className="label">Código do Ponto</label>
                <input type="number" className="input"></input>
                <label className="label">Latitude</label>
                <input type="number" className="input"></input>
                <label className="label">Longitude</label>
                <input type="number" className="input"></input>
                <label className="label">Nome do Ponto</label>
                <input type="text" className="input"></input>
                <label className="label">Endereço</label>
                <input type="text" className="input"></input>
                <label className="label">Bairro</label>
                <input type="text" className="input"></input>
                <label className="label">Comunidade</label>
                <input type="text" className="input"></input>
                <label className="label">Telefone para Contato</label>
                <input type="tel" className="input"></input>
                <label className="label">E-mail (opcional)</label>
                <input type="text" className="input"></input>
                <label className="label">Whatsapp (opcional)</label>
                <input type="tel" className="input"></input>
                <label className="label">Instagram (opcional)</label>
                <input type="text" className="input"></input>
                <label className="label">Nome do Responsável (opcional)</label>
                <input type="text" className="input"></input>
                <div className="buttonContainer">
                <button className="button">FINALIZAR</button>
                <button className="button">CANCELAR</button>
                </div>
                </div>

            </div>
        </div>

    );
}

export default FormularioPontosApoio;