!function($){function Freewall(selector){function setDraggable(item){var cellH=(runtime.gutterX,runtime.gutterY,runtime.cellH),cellW=runtime.cellW,$item=$(item),handle=$item.find($item.attr("data-handle"));layoutManager.setDraggable(item,{handle:handle[0],onStart:function(event){setting.animate&&layoutManager.transition&&layoutManager.setTransition(this,""),$item.css("z-index",9999).addClass("fw-float"),setting.onBlockDrag.call(item,event)},onDrag:function(event,tracker){var position=$item.position(),top=Math.round(position.top/cellH),left=Math.round(position.left/cellW),width=Math.round($item.width()/cellW),height=Math.round($item.height()/cellH);top=Math.min(Math.max(0,top),runtime.limitRow-height),left=Math.min(Math.max(0,left),runtime.limitCol-width),klass.setHoles({top:top,left:left,width:width,height:height}),klass.refresh(),setting.onBlockMove.call(item,event)},onDrop:function(event){var position=$item.position(),top=Math.round(position.top/cellH),left=Math.round(position.left/cellW),width=Math.round($item.width()/cellW),height=Math.round($item.height()/cellH);top=Math.min(Math.max(0,top),runtime.limitRow-height),left=Math.min(Math.max(0,left),runtime.limitCol-width),$item.removeClass("fw-float"),$item.css({zIndex:"auto",top:top*cellH,left:left*cellW});var x,y,key,oldDropId;for(y=0;y<height;++y)for(x=0;x<width;++x)key=y+top+"-"+(x+left),(oldDropId=runtime.matrix[key])&&1!=oldDropId&&$("#"+oldDropId).removeAttr("data-position");runtime.holes={},$item.attr({"data-width":$item.width(),"data-height":$item.height(),"data-position":top+"-"+left}),klass.refresh(),setting.onBlockDrop.call(item,event)}})}var container=$(selector);"static"==container.css("position")&&container.css("position","relative");var MAX=Number.MAX_VALUE,klass=this;layoutManager.totalGrid+=1;var setting=$.extend({},layoutManager.defaultConfig),runtime={arguments:null,blocks:{},events:{},matrix:{},holes:{},cellW:0,cellH:0,cellS:1,filter:"",lastId:0,length:0,maxWoB:0,maxHoB:0,minWoB:MAX,minHoB:MAX,running:0,gutterX:15,gutterY:15,totalCol:0,totalRow:0,limitCol:666666,limitRow:666666,sortFunc:null,keepOrder:!1};setting.runtime=runtime,runtime.totalGrid=layoutManager.totalGrid;var bodyStyle=document.body.style;layoutManager.transition||(null!=bodyStyle.webkitTransition||null!=bodyStyle.MozTransition||null!=bodyStyle.msTransition||null!=bodyStyle.OTransition||null!=bodyStyle.transition)&&(layoutManager.transition=!0),$.extend(klass,{addCustomEvent:function(name,func){var events=runtime.events;return name=name.toLowerCase(),!events[name]&&(events[name]=[]),func.eid=events[name].length,events[name].push(func),this},appendBlock:function(items){var allBlock=$(items).appendTo(container),block=null,activeBlock=[];runtime.arguments&&($.isFunction(runtime.sortFunc)&&allBlock.sort(runtime.sortFunc),allBlock.each(function(index,item){item.index=++index,(block=layoutManager.loadBlock(item,setting))&&activeBlock.push(block)}),engine[setting.engine](activeBlock,setting),layoutManager.setWallSize(runtime,container),runtime.length=allBlock.length,allBlock.each(function(index,item){layoutManager.showBlock(item,setting),(setting.draggable||item.getAttribute("data-draggable"))&&setDraggable(item)}))},appendHoles:function(holes){var i,newHoles=[].concat(holes),h={};for(i=0;i<newHoles.length;++i)h=newHoles[i],runtime.holes[h.top+"-"+h.left+"-"+h.width+"-"+h.height]=h;return this},container:container,destroy:function(){var allBlock=container.find(setting.selector).removeAttr("id");allBlock.each(function(index,item){$item=$(item);var width=1*$item.attr("data-width")||"",height=1*$item.attr("data-height")||"";$item.width(width).height(height).css({position:"static"})})},fillHoles:function(holes){if(0==arguments.length)runtime.holes={};else{var i,newHoles=[].concat(holes),h={};for(i=0;i<newHoles.length;++i)h=newHoles[i],delete runtime.holes[h.top+"-"+h.left+"-"+h.width+"-"+h.height]}return this},filter:function(filter){return runtime.filter=filter,runtime.arguments&&this.refresh(),this},fireEvent:function(name,object,setting){var events=runtime.events;if(name=name.toLowerCase(),events[name]&&events[name].length)for(var i=0;i<events[name].length;++i)events[name][i].call(this,object,setting);return this},fitHeight:function(height){var height=height||(container.height()||$W.height());this.fitZone("auto",height),runtime.arguments=arguments},fitWidth:function(width){var width=width||(container.width()||$W.width());this.fitZone(width,"auto"),runtime.arguments=arguments},fitZone:function(width,height){var allBlock=container.find(setting.selector).removeAttr("id"),block=null,activeBlock=[];height=height||(container.height()||$W.height()),width=width||(container.width()||$W.width()),runtime.arguments=arguments,layoutManager.resetGrid(runtime),layoutManager.adjustUnit(width,height,setting),runtime.filter?(allBlock.data("active",0),allBlock.filter(runtime.filter).data("active",1)):allBlock.data("active",1),$.isFunction(runtime.sortFunc)&&allBlock.sort(runtime.sortFunc),allBlock.each(function(index,item){var $item=$(item);item.index=++index,(block=layoutManager.loadBlock(item,setting))&&$item.data("active")&&activeBlock.push(block)}),klass.fireEvent("onGridReady",container,setting),engine[setting.engine](activeBlock,setting),layoutManager.setWallSize(runtime,container),klass.fireEvent("onGridArrange",container,setting),runtime.length=allBlock.length,allBlock.each(function(index,item){layoutManager.showBlock(item,setting),(setting.draggable||item.getAttribute("data-draggable"))&&setDraggable(item)})},fixPos:function(option){return $(option.block).attr({"data-position":option.top+"-"+option.left}),this},fixSize:function(option){return null!=option.height&&$(option.block).attr({"data-height":option.height}),null!=option.width&&$(option.block).attr({"data-width":option.width}),this},prepend:function(items){return container.prepend(items),runtime.arguments&&this.refresh(),this},refresh:function(){var params=arguments.length?arguments:runtime.arguments,oldArg=runtime.arguments;return(oldArg?oldArg.callee:this.fitWidth).apply(this,Array.prototype.slice.call(params,0)),this},reset:function(option){return $.extend(setting,option),this},setHoles:function(holes){var i,newHoles=[].concat(holes),h={};for(runtime.holes={},i=0;i<newHoles.length;++i)h=newHoles[i],runtime.holes[h.top+"-"+h.left+"-"+h.width+"-"+h.height]=h;return this},sortBy:function(func){return runtime.sortFunc=func,runtime.arguments&&this.refresh(),this},unFilter:function(){return delete runtime.filter,this.refresh(),this}}),container.attr("data-min-width",80*Math.floor($W.width()/80));for(var i in layoutManager.plugin)layoutManager.plugin.hasOwnProperty(i)&&layoutManager.plugin[i].call(klass,setting,container)}null==$.isNumeric&&($.isNumeric=function(src){return null!=src&&src.constructor===Number}),null==$.isFunction&&($.isFunction=function(src){return null!=src&&src instanceof Function});var $W=$(window),$D=$(document),layoutManager={defaultConfig:{animate:!1,cellW:100,cellH:100,delay:0,engine:"giot",fixSize:null,gutterX:15,gutterY:15,keepOrder:!1,selector:"> div",draggable:!1,cacheSize:!0,rightToLeft:!1,bottomToTop:!1,onGapFound:function(){},onComplete:function(){},onResize:function(){},onBlockDrag:function(){},onBlockMove:function(){},onBlockDrop:function(){},onBlockReady:function(){},onBlockFinish:function(){},onBlockActive:function(){},onBlockResize:function(){}},plugin:{},totalGrid:1,transition:!1,loadBlock:function(item,setting){var runtime=setting.runtime,gutterX=runtime.gutterX,gutterY=runtime.gutterY,cellH=runtime.cellH,cellW=runtime.cellW,block=null,$item=$(item),active=$item.data("active"),fixPos=$item.attr("data-position"),fixSize=parseInt($item.attr("data-fixSize")),blockId=runtime.lastId+++"-"+runtime.totalGrid;if($item.hasClass("fw-float"))return null;$item.attr({id:blockId,"data-delay":item.index}),setting.animate&&this.transition&&this.setTransition(item,""),isNaN(fixSize)&&(fixSize=null),null==fixSize&&(fixSize=setting.fixSize);var makeRound=fixSize?"ceil":"round";null==$item.attr("data-height")&&$item.attr("data-height",$item.height()),null==$item.attr("data-width")&&$item.attr("data-width",$item.width());var height=1*$item.attr("data-height"),width=1*$item.attr("data-width");setting.cacheSize||(item.style.width="",width=$item.width(),item.style.height="",height=$item.height());var col=width?Math[makeRound]((width+gutterX)/cellW):0,row=height?Math[makeRound]((height+gutterY)/cellH):0;if(fixSize||"auto"!=setting.cellH||($item.width(cellW*col-gutterX),item.style.height="",height=$item.height(),row=height?Math.round((height+gutterY)/cellH):0),fixSize||"auto"!=setting.cellW||($item.height(cellH*row-gutterY),item.style.width="",width=$item.width(),col=width?Math.round((width+gutterX)/cellW):0),null!=fixSize&&(col>runtime.limitCol||row>runtime.limitRow))block=null;else if(row&&row<runtime.minHoB&&(runtime.minHoB=row),col&&col<runtime.minWoB&&(runtime.minWoB=col),row>runtime.maxHoB&&(runtime.maxHoB=row),col>runtime.maxWoB&&(runtime.maxWoB=col),0==width&&(col=0),0==height&&(row=0),block={resize:!1,id:blockId,width:col,height:row,fixSize:fixSize},fixPos){fixPos=fixPos.split("-"),block.y=1*fixPos[0],block.x=1*fixPos[1],block.width=null!=fixSize?col:Math.min(col,runtime.limitCol-block.x),block.height=null!=fixSize?row:Math.min(row,runtime.limitRow-block.y);var holeId=block.y+"-"+block.x+"-"+block.width+"-"+block.height;active?(runtime.holes[holeId]={id:block.id,top:block.y,left:block.x,width:block.width,height:block.height},this.setBlock(block,setting)):delete runtime.holes[holeId]}return null==$item.attr("data-state")?$item.attr("data-state","init"):$item.attr("data-state","move"),setting.onBlockReady.call(item,block,setting),fixPos&&active?null:block},setBlock:function(block,setting){var runtime=setting.runtime,gutterX=runtime.gutterX,gutterY=runtime.gutterY,height=block.height,width=block.width,cellH=runtime.cellH,cellW=runtime.cellW,x=block.x,y=block.y;setting.rightToLeft&&(x=runtime.limitCol-x-width),setting.bottomToTop&&(y=runtime.limitRow-y-height);var realBlock={fixSize:block.fixSize,resize:block.resize,top:y*cellH,left:x*cellW,width:cellW*width-gutterX,height:cellH*height-gutterY};return realBlock.top=1*realBlock.top.toFixed(2),realBlock.left=1*realBlock.left.toFixed(2),realBlock.width=1*realBlock.width.toFixed(2),realBlock.height=1*realBlock.height.toFixed(2),block.id&&(runtime.blocks[block.id]=realBlock),realBlock},showBlock:function(item,setting){function action(){if(start&&$item.attr("data-state","start"),setting.animate&&self.transition&&self.setTransition(item,trans),block)block.fixSize&&(block.height=1*$item.attr("data-height"),block.width=1*$item.attr("data-width")),$item.css({opacity:1,width:block.width,height:block.height}),$item[method]({top:block.top,left:block.left}),null!=$item.attr("data-nested")&&self.nestedGrid(item,setting);else{var height=parseInt(item.style.height)||0,width=parseInt(item.style.width)||0,left=parseInt(item.style.left)||0,top=parseInt(item.style.top)||0;$item[method]({left:left+width/2,top:top+height/2,width:0,height:0,opacity:0})}runtime.length-=1,setting.onBlockFinish.call(item,block,setting),0==runtime.length&&setting.onComplete.call(item,block,setting)}var runtime=setting.runtime,method=setting.animate&&!this.transition?"animate":"css",block=runtime.blocks[item.id],$item=$(item),self=this,start="move"!=$item.attr("data-state"),trans=start?"width 0.5s, height 0.5s":"top 0.5s, left 0.5s, width 0.5s, height 0.5s, opacity 0.5s";item.delay&&clearTimeout(item.delay),$item.hasClass("fw-float")||(self.setTransition(item,""),item.style.position="absolute",setting.onBlockActive.call(item,block,setting),block&&block.resize&&setting.onBlockResize.call(item,block,setting),setting.delay>0?item.delay=setTimeout(action,setting.delay*$item.attr("data-delay")):action())},nestedGrid:function(item,setting){var innerWall,$item=$(item),runtime=setting.runtime,gutterX=$item.attr("data-gutterX")||setting.gutterX,gutterY=$item.attr("data-gutterY")||setting.gutterY,method=$item.attr("data-method")||"fitZone",nested=$item.attr("data-nested")||"> div",cellH=$item.attr("data-cellH")||setting.cellH,cellW=$item.attr("data-cellW")||setting.cellW,block=runtime.blocks[item.id];if(block)switch(innerWall=new Freewall($item),innerWall.reset({cellH:cellH,cellW:cellW,gutterX:1*gutterX,gutterY:1*gutterY,selector:nested,cacheSize:!1}),method){case"fitHeight":innerWall[method](block.height);break;case"fitWidth":innerWall[method](block.width);break;case"fitZone":innerWall[method](block.width,block.height)}},adjustBlock:function(block,setting){var runtime=setting.runtime,gutterX=runtime.gutterX,gutterY=runtime.gutterY,$item=$("#"+block.id),cellH=runtime.cellH,cellW=runtime.cellW;"auto"==setting.cellH&&($item.width(block.width*cellW-gutterX),$item[0].style.height="",block.height=Math.round(($item.height()+gutterY)/cellH))},adjustUnit:function(width,height,setting){var gutterX=setting.gutterX,gutterY=setting.gutterY,runtime=setting.runtime,cellW=setting.cellW,cellH=setting.cellH;if($.isFunction(cellW)&&(cellW=cellW(width)),cellW*=1,!$.isNumeric(cellW)&&(cellW=1),$.isFunction(cellH)&&(cellH=cellH(height)),cellH*=1,!$.isNumeric(cellH)&&(cellH=1),$.isNumeric(width)){cellW<1&&(cellW*=width);var limitCol=Math.max(1,Math.floor(width/cellW));$.isNumeric(gutterX)||(gutterX=(width-limitCol*cellW)/Math.max(1,limitCol-1),gutterX=Math.max(0,gutterX)),limitCol=Math.floor((width+gutterX)/cellW),runtime.cellW=(width+gutterX)/Math.max(limitCol,1),runtime.cellS=runtime.cellW/cellW,runtime.gutterX=gutterX,runtime.limitCol=limitCol}if($.isNumeric(height)){cellH<1&&(cellH*=height);var limitRow=Math.max(1,Math.floor(height/cellH));$.isNumeric(gutterY)||(gutterY=(height-limitRow*cellH)/Math.max(1,limitRow-1),gutterY=Math.max(0,gutterY)),limitRow=Math.floor((height+gutterY)/cellH),runtime.cellH=(height+gutterY)/Math.max(limitRow,1),runtime.cellS=runtime.cellH/cellH,runtime.gutterY=gutterY,runtime.limitRow=limitRow}$.isNumeric(width)||(cellW<1&&(cellW=runtime.cellH),runtime.cellW=1!=cellW?cellW*runtime.cellS:1,runtime.gutterX=gutterX,runtime.limitCol=666666),$.isNumeric(height)||(cellH<1&&(cellH=runtime.cellW),runtime.cellH=1!=cellH?cellH*runtime.cellS:1,runtime.gutterY=gutterY,runtime.limitRow=666666),runtime.keepOrder=setting.keepOrder},resetGrid:function(runtime){runtime.blocks={},runtime.length=0,runtime.cellH=0,runtime.cellW=0,runtime.lastId=1,runtime.matrix={},runtime.totalCol=0,runtime.totalRow=0},setDraggable:function(item,option){var isTouch=!1,config={startX:0,startY:0,top:0,left:0,handle:null,onDrop:function(){},onDrag:function(){},onStart:function(){}};$(item).each(function(){function mouseDown(evt){return evt.stopPropagation(),evt=evt.originalEvent,evt.touches&&(isTouch=!0,evt=evt.changedTouches[0]),2!=evt.button&&3!=evt.which&&(setting.onStart.call(ele,evt),setting.startX=evt.clientX,setting.startY=evt.clientY,setting.top=parseInt($E.css("top"))||0,setting.left=parseInt($E.css("left"))||0,$D.bind("mouseup touchend",mouseUp),$D.bind("mousemove touchmove",mouseMove)),!1}function mouseMove(evt){evt=evt.originalEvent,isTouch&&(evt=evt.changedTouches[0]),$E.css({top:setting.top-(setting.startY-evt.clientY),left:setting.left-(setting.startX-evt.clientX)}),setting.onDrag.call(ele,evt)}function mouseUp(evt){evt=evt.originalEvent,isTouch&&(evt=evt.changedTouches[0]),setting.onDrop.call(ele,evt),$D.unbind("mouseup touchend",mouseUp),$D.unbind("mousemove touchmove",mouseMove)}var setting=$.extend({},config,option),handle=setting.handle||this,ele=this,$E=$(ele),$H=$(handle);"absolute"!=$E.css("position")&&$E.css("position","relative"),$E.find("iframe, form, input, textarea, .ignore-drag").each(function(){$(this).on("touchstart mousedown",function(evt){evt.stopPropagation()})}),$D.unbind("mouseup touchend",mouseUp),$D.unbind("mousemove touchmove",mouseMove),$H.unbind("mousedown touchstart").bind("mousedown touchstart",mouseDown)})},setTransition:function(item,trans){var style=item.style,$item=$(item);!this.transition&&$item.stop?$item.stop():null!=style.webkitTransition?style.webkitTransition=trans:null!=style.MozTransition?style.MozTransition=trans:null!=style.msTransition?style.msTransition=trans:null!=style.OTransition?style.OTransition=trans:style.transition=trans},getFreeArea:function(t,l,runtime){for(var maxY=Math.min(t+runtime.maxHoB,runtime.limitRow),maxX=Math.min(l+runtime.maxWoB,runtime.limitCol),minX=maxX,minY=maxY,matrix=runtime.matrix,y=t;y<minY;++y)for(var x=l;x<maxX;++x)matrix[y+"-"+x]&&l<x&&x<minX&&(minX=x);for(var y=t;y<maxY;++y)for(var x=l;x<minX;++x)matrix[y+"-"+x]&&t<y&&y<minY&&(minY=y);return{top:t,left:l,width:minX-l,height:minY-t}},setWallSize:function(runtime,container){var totalRow=runtime.totalRow,totalCol=runtime.totalCol,gutterY=runtime.gutterY,gutterX=runtime.gutterX,cellH=runtime.cellH,cellW=runtime.cellW,totalWidth=Math.max(0,cellW*totalCol-gutterX),totalHeight=Math.max(0,cellH*totalRow-gutterY);container.attr({"data-total-col":totalCol,"data-total-row":totalRow,"data-wall-width":Math.ceil(totalWidth),"data-wall-height":Math.ceil(totalHeight)}),runtime.limitCol<runtime.limitRow&&!container.attr("data-height")&&container.height(Math.ceil(totalHeight))}},engine={giot:function(items,setting){function fillMatrix(id,t,l,w,h){for(var y=t;y<t+h;){for(var x=l;x<l+w;)matrix[y+"-"+x]=id,++x>maxX&&(maxX=x);++y>maxY&&(maxY=y)}}var runtime=setting.runtime,row=runtime.limitRow,col=runtime.limitCol,x=0,y=0,maxX=runtime.totalCol,maxY=runtime.totalRow,wall={},holes=runtime.holes,block=null,matrix=runtime.matrix,bigLoop=Math.max(col,row),freeArea=null,misBlock=null,fitWidth=col<row?1:0,lastBlock=null,smallLoop=Math.min(col,row);for(var i in holes)holes.hasOwnProperty(i)&&fillMatrix(holes[i].id||!0,holes[i].top,holes[i].left,holes[i].width,holes[i].height);for(var b=0;b<bigLoop&&items.length;++b){fitWidth?y=b:x=b,lastBlock=null;for(var s=0;s<smallLoop&&items.length;++s)if(block=null,fitWidth?x=s:y=s,!runtime.matrix[y+"-"+x]){if(freeArea=layoutManager.getFreeArea(y,x,runtime),null==setting.fixSize){if(lastBlock&&!fitWidth&&runtime.minHoB>freeArea.height){lastBlock.height+=freeArea.height,lastBlock.resize=!0,fillMatrix(lastBlock.id,lastBlock.y,lastBlock.x,lastBlock.width,lastBlock.height),layoutManager.setBlock(lastBlock,setting);continue}if(lastBlock&&fitWidth&&runtime.minWoB>freeArea.width){lastBlock.width+=freeArea.width,lastBlock.resize=!0,fillMatrix(lastBlock.id,lastBlock.y,lastBlock.x,lastBlock.width,lastBlock.height),layoutManager.setBlock(lastBlock,setting);continue}}if(runtime.keepOrder)block=items.shift(),block.resize=!0;else{for(var i=0;i<items.length;++i)if(!(items[i].height>freeArea.height||items[i].width>freeArea.width)){block=items.splice(i,1)[0];break}if(null==block&&null==setting.fixSize)for(var i=0;i<items.length;++i)if(null==items[i].fixSize){block=items.splice(i,1)[0],block.resize=!0;break}}if(null!=block)block.resize&&(fitWidth?(block.width=freeArea.width,"auto"==setting.cellH&&layoutManager.adjustBlock(block,setting),block.height=Math.min(block.height,freeArea.height)):(block.height=freeArea.height,block.width=Math.min(block.width,freeArea.width))),wall[block.id]={id:block.id,x:x,y:y,width:block.width,height:block.height,resize:block.resize,fixSize:block.fixSize},lastBlock=wall[block.id],fillMatrix(lastBlock.id,lastBlock.y,lastBlock.x,lastBlock.width,lastBlock.height),layoutManager.setBlock(lastBlock,setting);else{var misBlock={x:x,y:y,fixSize:0};if(fitWidth){misBlock.width=freeArea.width,misBlock.height=0;for(var lastX=x-1,lastY=y;matrix[lastY+"-"+lastX];)matrix[lastY+"-"+x]=!0,misBlock.height+=1,lastY+=1}else{misBlock.height=freeArea.height,misBlock.width=0;for(var lastY=y-1,lastX=x;matrix[lastY+"-"+lastX];)matrix[y+"-"+lastX]=!0,misBlock.width+=1,lastX+=1}setting.onGapFound(layoutManager.setBlock(misBlock,setting),setting)}}}runtime.matrix=matrix,runtime.totalRow=maxY,runtime.totalCol=maxX}};Freewall.addConfig=function(newConfig){$.extend(layoutManager.defaultConfig,newConfig)},Freewall.createEngine=function(engineData){$.extend(engine,engineData)},Freewall.createPlugin=function(pluginData){$.extend(layoutManager.plugin,pluginData)},Freewall.getMethod=function(method){return layoutManager[method]},window.Freewall=window.freewall=Freewall}(window.Zepto||window.jQuery);