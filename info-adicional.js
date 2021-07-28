function montaInfo(esconde1, esconde2, mostra, classe) {
    var divInfo = document.getElementById(mostra)
    // document.getElementById(esconde1).style.display = 'none'
    document.getElementById(esconde2).style.display = 'none'

    if (!document.body.contains(document.getElementsByClassName(classe)[0])) {
        var div = document.createElement('div')
        div.className = classe

        var imagem = new Image()
        imagem.src = 'img/close-icon.png'
        imagem.onclick = () =>{
          var divInfo = document.getElementById('sobre')
          divInfo.style.display = 'none'

          var divInfo = document.getElementById('ajuda')
          divInfo.style.display = 'none'
         }

        imagem.className = 'close-button'

        div.appendChild(imagem)

        var divTitulo = document.createElement('div')
        divTitulo.style.display = 'flex'
        divTitulo.style.alignItems = 'center'
        divTitulo.style.justifyContent = 'center'

        var titulo = document.createElement('h2')
        titulo.innerHTML = mostra

        divTitulo.appendChild(titulo)

        var divCorpo = document.createElement('div')
        divCorpo.style.display = 'flex'
        divCorpo.style.alignItems = 'center'
        divCorpo.style.justifyContent = 'center'

        var corpo = document.createElement('p')
        if (mostra == 'sobre') {
            corpo.innerHTML = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Dui vivamus arcu felis bibendum. Sapien eget mi proin sed libero enim sed faucibus turpis. Risus nec feugiat in fermentum posuere urna nec tincidunt praesent. Euismod elementum nisi quis eleifend quam adipiscing vitae proin sagittis. Neque gravida in fermentum et sollicitudin ac orci phasellus egestas. Leo in vitae turpis massa. Donec adipiscing tristique risus nec. Amet massa vitae tortor condimentum lacinia quis. Rhoncus aenean vel elit scelerisque mauris pellentesque pulvinar pellentesque. Varius quam quisque id diam vel quam elementum pulvinar etiam.'
        } else {
            corpo.innerHTML = 'Gravida quis blandit turpis cursus in hac habitasse platea dictumst. Cursus euismod quis viverra nibh cras. Vulputate dignissim suspendisse in est ante in nibh. Ridiculus mus mauris vitae ultricies leo integer malesuada nunc. Vitae et leo duis ut diam. Sed vulputate odio ut enim blandit volutpat. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Ac placerat vestibulum lectus mauris ultrices eros in cursus. Aliquet bibendum enim facilisis gravida neque convallis. In eu mi bibendum neque. Urna porttitor rhoncus dolor purus non. Euismod quis viverra nibh cras pulvinar mattis nunc sed blandit. Curabitur vitae nunc sed velit dignissim sodales ut.'
        }


        divCorpo.appendChild(corpo)

        div.appendChild(divTitulo)
        div.appendChild(divCorpo)

        divInfo.appendChild(div)
    } else {
        divInfo.style.display = 'flex'
    }

}

