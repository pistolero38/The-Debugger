/**
 * Tool manager. 
 */
class ToolMgr {
	
	/**
	 * @param pSceneView {SceneView} the scene object where to draw.
	 */
	constructor(pSceneView) {
		this.sceneView = pSceneView;
		this.currentTool = null;
	}
	
	/**
	 * @param pTool {String} The tool type (from EToolType)
	 * @return the tool manager according to the given parameter
	 */
	getToolManager(pTool) {
		switch(pTool) {
			case RECTANGLE_DRAW_TOOL_MGR:
				return new RectangleDrawToolMgr(this.sceneView);
			
			default:
				console.error("[ToolMgr::getToolManager] Tool " + pTool + " no managed.");
				return null;
		}
	}
	
	/**
	 * @param pTool {String} tool to set
	 */
	setCurrentTool(pTool) {
		if (this.currentTool != null) {
			this.currentTool.toggleOff();
		}
		if (pTool != null) {
			this.currentTool = this.getToolManager(pTool);
			if (this.currentTool != null) {
				this.currentTool.toggleOn();
			}
		} else {
			this.currentTool = null;
		}

	}

	/**
	 * @param pTool {String} tool to toggle
	 */
	toggleTool(pTool) {
		if (this.currentTool != null && this.currentTool.getType() == pTool) {
			this.currentTool.toggleOff();
			this.currentTool = null;
		} else if (this.currentTool == null) {
			this.currentTool = this.getToolManager(pTool);
			this.currentTool.toggleOn();
		} else {
			this.currentTool.toggleOff();
			this.currentTool = this.getToolManager(pTool);
			this.currentTool.toggleOn();
			
		}
	}
}
