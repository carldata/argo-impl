export interface ArgoImplScreen {
  /**
   * Restores Redux store state when screen is entered as first by a hard link
   * after application restart (browser window reload).
   *  What is being restored to the state might vary.
   */
  hardLinkRebuildState();
}