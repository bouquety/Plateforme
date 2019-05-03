var po = c3.generate({
    data: {
  
        columns: [
            ['dent creuse', 2],
            ['divishhrcellaire', 10],
            ['friche urbaine', 40],
            ['délaisser urbain', 80],
        ],
        type : 'pie',
        onclick: function (d, i) { console.log("onclick", d, i); },
        onmouseover: function (d, i) { console.log("onmouseover", d, i); },
        onmouseout: function (d, i) { console.log("onmouseout", d, i); },

      

        //colors: {
          //  data1: '#ff0000',
           // data2: '#00ff00',
            //data3: '#0000ff'
        //},


    }
    });