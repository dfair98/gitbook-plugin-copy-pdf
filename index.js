

module.exports = {
    hooks:
    {
        // For all the hooks, this represent the current generator

        // This is called before the book is generated
        "init": function() {
                },

        // This is called after the book generation
        "finish": function()
        {
           var fs = require('fs-extra');  
             var path = require('path');
            //Use relative directory.
            var filePath = './';
            copy_pdf(filePath);

            function copy_pdf(filePath){
                //Return file list
                fs.readdir(filePath, function(err, files){
                    if (err){
                        console.warn(err)
                    }else{
                        //Traverse files in file list.  
                        files.forEach(function(filename){

                            var filedir = path.join(filePath, filename);
                            var filePath_new = path.join('./public', filedir);
                            //Return fs.Stats object  
                            fs.stat(filedir, function(err, stats){
                                if (err){
                                    console.warn('Get file stats failed');
                                }else{
                                    var isFile = stats.isFile();
                                    var isDir = stats.isDirectory();
                                   if (isFile){
                                        var extension = path.extname(filename);
                                        if (".pdf" == extension.toLowerCase()) copyFile(filedir ,filePath_new);
                                    }
                                    if (isDir && ("public" != filename)) copy_pdf(filedir);
                                }
                            });
                        });
                    }
                });
            }
            async function copyFile(source, target) {
                const fs = require('fs-extra')  
                try {  
                    fs.copySync(source, target)  
                 console.info('Copied PDF to '+ target +'!')  
                } catch (err) {  
                 console.error(err)  
                }  
              }

        }
    }
};