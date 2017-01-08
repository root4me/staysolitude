var fs = require('fs');
var path = require('path');

var mList = [];
var sList = [];

var getFiles = function(dir) {
  var files = fs.readdirSync(dir);
  var list = [];
  for (var i = 0; i < files.length; i++) {
    //console.log(files[i]);
    if (fs.statSync(path.resolve(dir, files[i])).isFile()) {

      if (files[i].indexOf('_medium.') != -1) {
        mList.push(files[i])
          //fs.createReadStream(path.resolve(dir, files[i])).pipe(fs.createWriteStream(path.resolve(dir, files[i] + "new")));
      }
      if (files[i].indexOf('_small.') != -1) {
        sList.push(files[i])
      }
    }
  }

  sort(mList);
}

// Sort the list based on modified date time of images
var sort = function(list) {
  list.sort(function(a, b) {
    if (fs.statSync(path.resolve('app/img', a)).mtime < fs.statSync(path.resolve('app/img', b)).mtime) return -1;
    if (fs.statSync(path.resolve('app/img', a)).mtime > fs.statSync(path.resolve('app/img', b)).mtime) return 1;
    if (fs.statSync(path.resolve('app/img', a)).mtime == fs.statSync(path.resolve('app/img', b)).mtime) return 0;
  });
}

var generatehtml = function() {
  var o = '';
  var t = '<li><a href="img/medium"><img src="img/small"></a></li>';

  for (var j = 0; j < mList.length; j++) {
    //console.log(mList[j].substr(0, mList[j].lastIndexOf('_')) + '_small' + mList[j].substr(mList[j].lastIndexOf('.'),mList[j].length));
    if (sList.indexOf(mList[j].substr(0, mList[j].lastIndexOf('_')) + '_small' + mList[j].substr(mList[j].lastIndexOf('.'), mList[j].length)) !== -1) {
      o = o + t.replace('small', sList[sList.lastIndexOf(mList[j].substr(0, mList[j].lastIndexOf('_')) + '_small' + mList[j].substr(mList[j].lastIndexOf('.'), mList[j].length))]).replace('medium', mList[j]) + '\r\n';
      //    console.log(i);
    } else {
      console.log('..not found small img ' + sList[sList.lastIndexOf(mList[j].substr(0, mList[j].indexOf('_')) + '_small' + mList[j].substr(mList[j].lastIndexOf('.'), mList[j].length))]);
    }
  }

  console.log("--------------------------------------------\r\n");
  console.log(o);
  console.log("--------------------------------------------");
  console.log('done ..\r\nCopy and paste the above html into   <ul class="clearing-thumbs" data-clearing> inside gallery.html \r\n');
}

getFiles('app/img');
generatehtml();
