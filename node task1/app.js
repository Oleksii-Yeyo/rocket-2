const fs = require('fs');
const path = require('path');

fs.readdir(__dirname, (err,data) => {
    for(i of data){
        let item = i;

        fs.readdir(path.join(__dirname,item), (err,data) => {
            if(data){
                for(x of data){
                    let name = x;
                    let file = path.join(__dirname,item,x);
    
                    fs.readFile(file,(err,data) => {
                        let json = JSON.parse(data);
                
                        if(json.gender === 'female') {
                            fs.rename(file,path.join(__dirname,'girls',name),(e) => {})
                        } else {
                            fs.rename(file,path.join(__dirname,'boys',name),(e) => {})
                        }
                
                    })                        
                }
            }
        }) 
    }                
})