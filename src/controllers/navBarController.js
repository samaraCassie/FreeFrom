const ejs = require('ejs');
const mysqls = require('mysql2');

// const connection = mysqls.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: '',
//     database: 'freefrom'
// });

const navbarController = (req, callback, page) => {
    var template;

    if(page == 'carrinho'){
        template = `<header class="barra">
        <nav class="bar-menu">
            <ul>   
                <li><a class="menu" href="/">Início</a></li>
                <li><a class="menu" href="/_produtos">Produtos</a></li>
                <li><a class="aq" href="/_carrinho">Carrinho</a></li>
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
        <div class="busca">
                <form class="formBusca" method="GET" action="/_pesquisa">
                    <div>
                        <input type="text" name="pesquisa" placeholder="Pesquise o que você deseja">
                        <button class="buscar" type="submit">Buscar</button>
                    </div>
                </form>
            </div>
    </header>`;
    }
    else if(page == 'produto'){
        template = `<header class="barra">
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
        <div class="busca">
                <form class="formBusca" method="GET" action="/_pesquisa">
                    <div>
                        <input type="text" name="pesquisa" placeholder="Pesquise o que você deseja">
                        <button class="buscar" type="submit">Buscar</button>
                    </div>
                </form>
            </div>
    </header>`;
    }
    else if(page == 'loja'){
        template = `<header class="barra">
        <nav class="bar-menu">
            <ul>   
                <li><a class="menu" href="/">Início</a></li>
                <li><a class="menu" href="/_produtos">Produtos</a></li>
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
        <div class="busca">
                <form class="formBusca" method="GET" action="/_pesquisa">
                    <div>
                        <input type="text" name="pesquisa" placeholder="Pesquise o que você deseja">
                        <button class="buscar" type="submit">Buscar</button>
                    </div>
                </form>
            </div>
    </header>`;
    }
    else if('sobre'){
        template = `<header class="barra">
        <nav class="bar-menu">
            <ul>   
                <li><a class="menu" href="/">Início</a></li>
                <li><a class="menu" href="/_produtos">Produtos</a></li>
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
        <div class="busca">
                <form class="formBusca" method="GET" action="/_pesquisa">
                    <div>
                        <input type="text" name="pesquisa" placeholder="Pesquise o que você deseja">
                        <button class="buscar" type="submit">Buscar</button>
                    </div>
                </form>
            </div>
    </header>`;
    }
    else{
        template = `<header class="barra">
        <nav class="bar-menu">
            <ul>   
                <li><a class="menu" href="/">Início</a></li>
                <li><a class="menu" href="/_produtos">Produtos</a></li>
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
        <div class="busca">
                <form class="formBusca" method="GET" action="/_pesquisa">
                    <div>
                        <input type="text" name="pesquisa" placeholder="Pesquise o que você deseja">
                        <button class="buscar" type="submit">Buscar</button>
                    </div>
                </form>
            </div>
    </header>`;
    }
  
    let user = req.session.user;
    let usuario;
    let vendedor;
    let idLoja;
  
    if (user) {
      connection.query('SELECT id_usuario, id_vendedor FROM vendedor WHERE id_usuario = ?', [user[0].id_usuario], (err, results, field) => {
        if (err) throw err;
  
        if (results != "") {
          usuario = true;
          vendedor = true;
          idLoja = results[0].id_vendedor;
        } else {
          usuario = true;
          vendedor = false;
          idLoja = null;
        }
  
        const context = { user: user, usuario: usuario, vendedor: vendedor, idLoja: idLoja };
        const navBar = ejs.render(template, context);
        callback(navBar);
      });
    } else {
      usuario = false;
      vendedor = false;
      idLoja = null;
  
      const context = { user: user, usuario: usuario, vendedor: vendedor, idLoja: idLoja };
      const navBar = ejs.render(template, context);
      callback(navBar);
    }
  };
  
  module.exports = navbarController;
  