class AToolMgr {
	
	/**
	 * @param pSceneView {SceneView} the scene object where to draw.
	 */
	constructor(pSceneView) {
		this.sceneView = pSceneView;
	}
	
	/**
	 * @return {String} The tool type (from EToolType)
	 */
	getType() {
		throw new Error("[AToolMgr::getType] Must implemented in subclass !");
	}
	
	/**
	 * Executed when clicking button.
	 * 
	 * @param pEvent the mouse event
	 */
	onClick(pEvent) {
	}
	
	/**
	 * Executed when pressing mouse button.
	 * 
	 * @param pEvent the mouse event
	 */
	onMouseDown(pEvent) {
	}
	
	/**
	 * Executed when the mouse is moving.
	 * 
	 * @param pEvent the mouse event
	 */
	onMouseMove(pEvent) {
	}
	
	/**
	 * Executed when mouse button is released.
	 * 
	 * @param pEvent the mouse event
	 */
	onMouseUp(pEvent) {
	}
	
	/**
	 * Activate the tool.
	 */
	toggleOn() {
		throw new Error("[AToolMgr::toggleOn] Must implemented in subclass !");
	}
	
	/**
	 * Deactivate the tool.
	 */
	toogleOff() {
		throw new Error("[AToolMgr::toggleOff] Must implemented in subclass !");
	}
	
}
