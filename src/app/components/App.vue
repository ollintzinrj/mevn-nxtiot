<template>
  <div>

    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <a class="navbar-brand" href="/">
          <img src="/img/Logo-NXTIoT-color_500-300x56.png">
        </a>
      </div>
    </nav>

    <div class="container">

      <div class="row pt-5">
        <div class="col-md-5">
          
          <div class="card">
            <div class="card-header" v-on:click="obtenerDatosExternos">
              <button class="btn btn-primary">Obtener Datos</button>
            </div>

            <div class="card-body">
              
                <div class="form-group">
                  <label class="form-label">Ultimos datos obtenidos de UselessFact</label>
                </div>

                <div class="form-group form-floating">
                  <input v-model="item.id" type="text" id="floatingId" class="form-control" >
                  <label for="floatingId">Insertar un ID</label>
                </div>
                <div class="form-group form-floating">
                  <input v-model="item.text" type="text" id="floatingText" class="form-control">
                  <label for="floatingText">Insertar un Texto</label>
                </div>
                <div class="form-group form-floating">
                  <input v-model="item.source" type="text" id="floatingSource" class="form-control">
                  <label for="floatingSource">Insertar un Recurso</label>
                </div>
                <div class="form-group form-floating">
                  <input v-model="item.source_url" type="text" id="floatingUrl" class="form-control">
                  <label for="floatingUrl">Insertar una URL del recurso</label>
                </div>
                <div class="form-group form-floating">
                  <input v-model="item.language" type="text" id="floatingLanguaje" class="form-control">
                  <label for="floatingLanguaje">Insertar un lenguaje</label>
                </div>
                <div class="form-group form-floating">
                  <input v-model="item.permalink" type="text" id="floatingPermalink" class="form-control">
                  <label for="floatingPermalink">Insertar un permalink</label>
                </div>
            </div>
          </div>

        </div>


        <div class="col-md-7">
          <div class="table-responsive">
            <table class="table table-dark table-hover table-sm">
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">#</th>
                  <th scope="col">Text</th>
                  <th scope="col">Source</th>
                  <th scope="col">Url</th>
                  <th scope="col">Language</th>
                  <th scope="col">Permalink</th>
                  <th scope="col">Eliminar</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="i of items">
                  <td>{{i._id}}</td>
                  <td>{{i.id}}</td>
                  <td>{{i.text}}</td>
                  <td>{{i.source}}</td>
                  <td>{{i.source_url}}</td>
                  <td>{{i.languaje}}</td>
                  <td>{{i.permalink}}</td>
                  <td>
                    <button @click="borrarItem(i._id)" class="btn btn-danger" id="liveToastBtn">Borrar</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>

  <footer class="d-flex footer">
    <div class="col d-flex justify-content-center">
      <p style="margin-top: revert;">Ollintzin Rosas</p>
    </div>
    <div class="col d-flex justify-content-center" style="margin: auto;">
      <a href="https://web.facebook.com/Ollintzin">
        <!-- Estaba usando iconos de material pero no pude acceder a la plataforma
          <span class="material-icons icon">facebook</span> -->
        <ion-icon name="logo-facebook" class="icon"></ion-icon>
      </a>
      <a href="https://www.linkedin.com/in/ollintzin-rosas-juarez-220052100">
        <ion-icon name="logo-linkedin" class="icon"></ion-icon>
      </a>
      <a href="https://github.com/ollintzinrj">
        <ion-icon name="logo-github" class="icon"></ion-icon>
      </a>
    </div>
  </footer>

  </div>
</template>

<script>
  export default{
    data ()
    {
      //modelado del item 
      return {
        item : {
          id: '',
          text: '',
          source: '',
          source_url: '',
          language : '',
          permalink : ''
        },
        items : [],
      }
    },
    created(){
      //Este metodo se inicializa apenas se crea el template
      // this.obtenerDatosExternos();
      this.obtenerItems();
    },
    methods: {
      obtenerItems(){
        //Petición
        fetch('/items')
        //Respuesta
        .then(res => res.json())
        .then(data => {
          // console.log(data);
          this.items = data;
          // console.log(this.items);
        })
      },
      agregarItem(){
        console.log(this.item);
        //Petición
        fetch('/items/add',{
          method : 'POST', 
          body : JSON.stringify(this.item),
          headers : {
            'Accept' : 'application/json',
            'Content-type' : 'application/json'
          }
        })
        //Respuesta
        .then(res => res.json())
        .then(res => console.log(res))
      },
      obtenerDatosExternos(){
        this.$http.get('https://uselessfacts.jsph.pl/random.json')
        .then((res) => {
          console.log(res);
          this.item = res.body;
          this.agregarItem();
          this.obtenerItems();
        });
        // .then(res => console.log(res))
        // .then(res => this.items.res.body)
      },
      borrarItem(id){
        console.log("Eliminando: "+id);
        //Petición
        fetch('/items/delete/'+id, {
          method : 'DELETE', 
          headers : {
            'Accept' : 'application/json',
            'Content-type' : 'application/json'
          }
        })
        //Respuesta
        .then(res => res.json())
        .then(data => {
          this.obtenerItems();
        });
      }
    }//cierra methods
  }//cierra export
</script>