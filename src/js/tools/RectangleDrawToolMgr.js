/**
 * Tool that manage drawing of rectangles in the scene.
 */
const RectangleDrawToolMgr = (function() {
	
	class RectangleDrawToolMgrClass extends AToolMgr {

		/**
		 * @param pSceneView {SceneView} the scene object where to draw.
		 */
		constructor(pSceneView) {
			super(pSceneView);
			this.rect = null;
			this.mouseStart = {
				x: 0,
				y: 0
			};
			
			this.timer = null;
		}
		
		/**
		 * @return {String} The tool type (from EToolType)
		 */
		getType() {
			return RECTANGLE_DRAW_TOOL_MGR;
		}
		
		/**
		 * Executed when pressing mouse button.
		 * 
		 * @param pEvent the mouse event
		 */
		onMouseDown(pEvent) {
			if (pEvent.button === 0) {
				console.debug("[RectangleDrawToolMgr::onMouseDown] start draw.");
					
				this.mouseStart.x = this.sceneView.mouse.x;
				this.mouseStart.y = this.sceneView.mouse.y;
				
				this.rect = createRectangle.call(this);
			}
		}
		
		/**
		 * Executed when the mouse is moving.
		 * 
		 * @param pEvent the mouse event
		 */
		onMouseMove(pEvent) {
			if (this.rect !== null) {
				
				if (this.sceneView.scene.style('cursor') !== 'crosshair') {
					// trick to change cursor in chrome
					setTimeout(function() {
						this.sceneView.scene.style('cursor', 'crosshair');
					}.bind(this), 10);
				}
				
				const width = Math.abs(this.sceneView.mouse.x - this.mouseStart.x);
				const height = Math.abs(this.sceneView.mouse.y - this.mouseStart.y);

				const left = (this.sceneView.mouse.x - this.mouseStart.x < 0) ? this.sceneView.mouse.x  : this.mouseStart.x ;
				const top = (this.sceneView.mouse.y - this.mouseStart.y < 0) ? this.sceneView.mouse.y : this.mouseStart.y ;
				
				this.rect.size(width, height);
				this.rect.move(left, top);
			}
		}
		
		/**
		 * Executed when mouse button is released.
		 * 
		 * @param pEvent the mouse event
		 */
		onMouseUp(pEvent) {
			if (this.rect !== null) {
				if (this.mouseStart.x === this.sceneView.mouse.x && this.mouseStart.y === this.sceneView.mouse.y) {
					console.debug("[RectangleDrawToolMgr::onMouseUp] same coordinate, remove rectangle from scene.");
					unDrawRectangle.call(this);
				}
				
				this.rect = null;
				this.sceneView.scene.style('cursor', 'default');
				console.debug("[RectangleDrawToolMgr::onMouseUp] draw finished.");
			}
		}
		
		/**
		 * Activate the tool.
		 */
		toggleOn() {
			this.rect = null;
		}
		
		/**
		 * Deactivate the tool.
		 */
		toogleOff() {
			unDrawRectangle.call(this);
		}
	}
	
	////////////////////////////////////////////////////////////////////
	/////////////////////// PRIVATE FUNCTION ///////////////////////////
	////////////////////////////////////////////////////////////////////
	
	/**
	 * @return {SVG.Rect} a new rectangle in the scene with double click event handle and size to 0.
	 */
	function createRectangle() {
		const color = 'rgb('+NumberUtils.random(255)+','+NumberUtils.random(255)+','+NumberUtils.random(255)+')'
			, rect = this.sceneView.scene.rect(0,0).move(this.sceneView.mouse.x, this.sceneView.mouse.y).fill(color);
				
		rect.on('dblclick', function(e) {
			console.debug('dbleclick');
			
			// prevent to rotate a rectangle already rotating
			if (this.data('rotate')) {
				return;
			}
			
			// mark this rectangle that is rotating
			this.data('rotate', true);
			
			// start rotate rectangle and check all the rotations are done before removing the rectangles
			this.animate(1000, '-').rotate(360).after(function() {
				// mark this rectangle that can be removed (rotation finished)
				this.data('toRemove', true);
				
				const rectSet = SVG.select('rect')
					, nbRect = rectSet.length()
				console.debug("[RectangleDrawToolMgr::onMouseDown] nb rectangles = " + nbRect);
				
				let canRemove = true
					, i, rect;
				// check all rectangle rotating are done
				for (i=0; i<nbRect; i++) {
					rect = rectSet.get(i);
					if (rect.data('rotate') && !rect.data('toRemove')) {
						canRemove = false;
						break;
					}
				}
				
				if (canRemove) {
					// remove all rotated rectangle
					for (i=0; i<nbRect; i++) {
						rect = rectSet.get(i);
						if (rect.data('rotate') && rect.data('toRemove')) {
							rect.remove();
						}
					}
				}
				
				rectSet.clear();
			});
		});
		
		return rect;
	}
	
	/**
	 * Remove rectangle from the scene. 
	 */
	function unDrawRectangle() {
		
		this.rect.remove();
		this.rect = null;
		
		console.debug("[RectangleDrawToolMgr::unDrawRectangle] rectangle removed from scene.");
	}

	return RectangleDrawToolMgrClass;
	
}());
