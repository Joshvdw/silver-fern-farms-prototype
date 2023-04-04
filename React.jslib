mergeInto(LibraryManager.library, {
  PageOpen: function (principle) {
    window.dispatchReactUnityEvent("PageOpen",Pointer_stringify(principle));
  },
});
