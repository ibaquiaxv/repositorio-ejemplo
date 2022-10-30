window.addEventListener('DOMContentLoaded', event => {
    // Simple-DataTables
    // https://github.com/fiduswriter/Simple-DataTables/wiki
    
    const datatablesSimple = document.getElementById('datatablesSimple');
    if (datatablesSimple) {
       //new simpleDatatables.DataTable(datatablesSimple);
       let dataTable = new simpleDatatables.DataTable("#datatablesSimple", {
        searchable: true,
        // fixedHeight: true,
        paging: true,
        language: {
            url: "https://cdn.datatables.net/plug-ins/1.10.19/i18n/Spanish.json"
        },
    
    });
    //  console.log(simpleDatatables.DataTable)
      
   /*   $(document).ready(function() { 
        $('#datatablesSimple').DataTable({            
             
               "paging": true,
               "sDom": "Tfrtip",
               "language": {
                               "url": "https://cdn.datatables.net/plug-ins/1.10.19/i18n/Spanish.json"
                           },
                           "columnDefs":[{
                            "targets":[5,5] ,
                        
                        }]   
                });
        
       });*/
       
    }
});


