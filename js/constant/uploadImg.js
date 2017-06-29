$('#fileElem').localResizeIMG({
     width: 100,
     quality: 0.5,
     success: function (result) {
     var img = new Image();
     img.src = result.base64;
             $.ajax({
				type:"POST",
				url:config.shopPicUpload,
				async:true,
				data:"fileStream="+encodeURI(img.src).replace(/\+/g,'%2B'),
				success:function(data) {
					$("#fileList").attr("src",img.src);
				}
			});
     }
 });