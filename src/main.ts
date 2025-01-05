import { DOM } from "./DOM.js";
import { TextFragmentURLManager } from "./TextFragmentModel.js";
import { ToastManager } from "./Toast.js";
import { RangeModel, SelectionManager } from "./selections.js";

const form = DOM.$throw("form") as HTMLFormElement;
const urlInput = DOM.$throw("#url") as HTMLInputElement;
const generatedUrlDisplay = DOM.$throw("#generated-url") as HTMLAnchorElement;

const toastManager = new ToastManager({
  position: "top-right",
});
toastManager.setup();

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  const start = formData.get("start") as string;
  const end = formData.get("end") as string;
  if (!start || !urlInput.value) return;

  const baseUrl = urlInput.value;
  const fragmentManager = new TextFragmentURLManager(baseUrl);
  if (!end) {
    const fragmentUrl = fragmentManager.createFragmentURL(start);
    generatedUrlDisplay.textContent = fragmentUrl;
  } else {
    const fragmentUrl = fragmentManager.createFragmentURLWithStartAndEnd(
      start,
      end
    );
    generatedUrlDisplay.textContent = fragmentUrl;
  }
  navigator.clipboard.writeText(generatedUrlDisplay?.textContent || "");
  toastManager.success("URL copied to clipboard");

  const rangeModel = new RangeModel();
  rangeModel.setStart(generatedUrlDisplay.firstChild!, 0);
  rangeModel.setEnd(
    generatedUrlDisplay.firstChild!,
    generatedUrlDisplay.textContent!.length
  );
  SelectionManager.selectRange(rangeModel.range);

  form.reset();
});
