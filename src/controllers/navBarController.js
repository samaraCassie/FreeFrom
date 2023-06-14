const ejs = require('ejs');
const mysqls = require('mysql2');

const connection = mysqls.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'freefrom'
});

const navbarController = (req) => {
    const template  = `<header class="barra">
        <nav class="bar-menu">
            <ul>   
                <li><a class="menu" href="/">Início</a></li>
                <li><a class="aq" href="/_produtos">Produtos</a></li>
                <li><a class="menu" href="/_carrinho">Carrinho</a></li>
                <li>
                    <a class="menu" href="#">Mais▾</a>
                    <ul>
                        <% if(!vendedor){ %>
                            <li class="subMenu"><a href="/_cadastroLoja">Vender</a></li>
                        <% } %>
                        <li class="subMenu"><a href="/_Sobre">Sobre Nós</a></li>
                    </ul>
                </li>

                <li>
                    <a class="menu" href="#">
                        <label id="icone" for="conta">
                            <div class="user">
                                <% if(usuario){ %>
                                    <span><%= user[0].usuario %></span>
                                <% }else{ %>
                                    <span>Log In</span>
                                <% } %>
                            </div>
                            <img src="/Img/profile-user.png" width="30" height="30">
                        </label>
                    </a>
                    <ul id="conta">
                        <% if(usuario){ %>
                            <% if(vendedor){ %>
                                <li class="subMenu"><a href="/_PerfilLoja/<%- idLoja %>">Minha Loja</a></li>
                            <% } %>
                            <li class="subMenu"><a href="/_logOut">Sair</a></li>
                        <% }else{ %>
                            <li class="subMenu"><a href="/_Cadastro">Cadastrar</a></li>
                            <li class="subMenu"><a href="/_Login">Entrar</a></li>
                        <% } %>
                    </ul>
                </li>
            </ul>
        </nav>
    </header>`;

    let user = req.session.user;
    var usuario;
    var vendedor;
    var idLoja;


    if (user != undefined || user != null){
        connection.query('SELECT id_usuario, id_vendedor FROM vendedor WHERE id_usuario = ?', [user[0].id_usuario], (err, results, field) => {
            if(err) throw err;
            // Renderiza a página do dashboard com as informações do usuário
            if(results != ""){
                usuario = true;
                vendedor = true;
                idLoja = results[0].id_vendedor;
            }
            else{
                usuario = true;
                vendedor = false;
                idLoja = null;
            }
        });
      }
    else{
        usuario = false;
        vendedor = false;
        idLoja = null;
    }  

    console.log(usuario, vendedor, idLoja);
    const context = { user: user, usuario: usuario, vendedor: vendedor, idLoja: idLoja};
    const navBar = ejs.render(template, context);

    return navBar;
};

module.exports = navbarController;