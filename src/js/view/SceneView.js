/**
 * Class that manage the scene, events, objects in the scene.
 */
const SceneView = (function() {
	
	class SceneViewClass {
	
		constructor(pWidth, pHeight) {	
			this.scene = SVG('debugger-scene').size(pWidth, pHeight).style({'border': '1px dashed black'});
			this.width = pWidth;
			this.height = pHeight;

			this.toolMgr = new ToolMgr(this);
			this.toolMgr.setCurrentTool(RECTANGLE_DRAW_TOOL_MGR);
			
			this.mouse = {
				x: 0,
				y: 0
			};
			
			updateScenePosition.call(this);
			
			initSceneEvents.call(this);
			
			window.addEventListener("scroll", updateScenePosition.bind(this), false);
			window.addEventListener("resize", updateScenePosition.bind(this), false);
		}
	}
	
	////////////////////////////////////////////////////////////////////
	/////////////////////// PRIVATE FUNCTION ///////////////////////////
	////////////////////////////////////////////////////////////////////
	
	/**
	 * Define events handling.
	 */
	function initSceneEvents() {
		const that = this;
		
		SVG.on(document, 'mousedown', function (pEvent) {
			console.debug("[SceneView::onmousedown]");
			
			setMousePosition.call(that, pEvent);
			
			const tool = that.toolMgr.currentTool;
			if (tool != null) {
				tool.onMouseDown(pEvent);
			}
		});
			
		SVG.on(document, 'mousemove', function (pEvent) {
			console.debug("[SceneView::onmousemove]");
			
			setMousePosition.call(that, pEvent);
			
			const tool = that.toolMgr.currentTool;
			if (tool != null) {
				tool.onMouseMove(pEvent);
			}
		});
		
		SVG.on(document, 'mouseup', function (pEvent) {
			console.debug("[SceneView::onmouseup]");
			
			const tool = that.toolMgr.currentTool;
			if (tool != null) {
				tool.onMouseUp(pEvent);
			}
		});
	}
	
	/**
	 * Compute mouse position in the scene and store it.
	 */
	function setMousePosition(pEvent) {

		this.mouse.x = pEvent.clientX - this.scenePosition.x;
		this.mouse.y = pEvent.clientY - this.scenePosition.y;
      
    }
    
    /**
     * @return the real position of the scene in the page
     */
    function getScenePosition() {
		let xPos = 0
		  , yPos = 0
		  , el = this.scene.node.parentElement;
	 
		while (el) {
			if (el.tagName == "BODY") {
				// deal with browser quirks with body/window/document and page scroll
				let xScroll = el.scrollLeft || document.documentElement.scrollLeft;
				let yScroll = el.scrollTop || document.documentElement.scrollTop;
	 
				xPos += (el.offsetLeft - xScroll + el.clientLeft);
				yPos += (el.offsetTop - yScroll + el.clientTop);
			} else {
				// for all other non-BODY elements
				xPos += (el.offsetLeft - el.scrollLeft + el.clientLeft);
				yPos += (el.offsetTop - el.scrollTop + el.clientTop);
			}
	 
			el = el.offsetParent;
		}
		
		console.debug('[SceneView::getScenePosition] ('+xPos+','+yPos+')'); 
		
		return {
			x: xPos,
			y: yPos
		};
	}
	
	/**
	 * Store the scene position.
	 */
	function updateScenePosition() {
		this.scenePosition = getScenePosition.call(this);
	}
	
	return SceneViewClass;
}());
