var fileTree = {
    "home" : {
                "documents" : ["jeremyAguilonResume.pdf"],
                "repositories" : []
             }
};

var currentDirectory = "home";



var defaultPrompt = {
        greetings: 'You are authenticated. Level: Classified access',
        name: 'visitor',
        height: 200,
        prompt: 'visitor:~$  ',
        exit: false
    }

jQuery(function($, undefined) {

    $('#term_demo').terminal({

        exit : function() {
            window.location.href="/";
        },

        cat : function(file) {
/*            var http = new XMLHttpRequest();
            http.open('HEAD', "content/" + file, false);
            http.send();
            if (http.status!=404) {
                window.open("content/file" + file);
            } else {
                this.echo("File does not exist");
            }
*/

            window.open("content/" + file);
        },

        ls : function() {
            if (currentDirectory != "home") {
                this.echo(fileTree["home"][currentDirectory]);
            } else {
                for (object in fileTree["home"]) {
                    this.echo("    " + object.toString());
                }
            }
        },

        cd: function(directory) {
            if (currentDirectory == "home") {
                var found = false;
                for (object in fileTree["home"]) {
                    if (object == directory) {
                        currentDirectory = directory;
                        found = true;
                        var currD = this.get_prompt();
                        this.set_prompt(currD.slice(0, currD.length - 2) + "/" + object + "$  ");
                    }


                }

                if (!found) {
                    this.echo("Directory not found");
                }


            } else if (currentDirectory != "home" && directory == "..") {
                this.set_prompt("visitor:~/$");
                currentDirectory = "home";
            } else {
                this.echo("Directory not found");
            } 
        },

    }, defaultPrompt);
});

