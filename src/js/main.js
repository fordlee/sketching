(function(){
    var $ = window.$ || function(id){
        return document.getElementById(id);
    }

    var doSketch = function(){
        var st = strangth.value || 5;
        var imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        sk.sketch(imgData, st);
        ctx.putImageData(imgData, 0, 0);
    }

    var drawImage = function(img){
        //set the width/height will clear the canvas
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0 ,0);
        doSketch();
        download.href = canvas.toDataURL();
    }

    var canvas = $('canvas'),
        action = $('action'),
        download = $('download'),
        strangth = $('strength'),
        dropper = $('dropper'),

        ctx = canvas.getContext('2d'),
        cacheImg;

    dropper.addEventListener('drop', function(e){
        e.preventDefault();
        dropper.innerHTML = '';
        var file = e.dataTransfer.files[0];
        var reader = new FileReader();
        reader.onload = function(e){
            var img = new Image();
            img.onload = function(){
                if(!cacheImg){
                    action.disabled = false;
                }
                cacheImg = this;
                drawImage(this);
            }
            img.src = e.target.result;
        }
        reader.onerror = function(e){
            var code = e.target.error.code;
            if(code === 2){
                alert('please don\'t open this page using protocol fill:///');
            }else{
                alert('error code: ' + code);
            }
        }
        reader.readAsDataURL(file);
    });

    action.addEventListener('click', function(e){
        if(cacheImg){
            drawImage(cacheImg);
        }else{
            alert('please select a picture first')
        }
    });

})();