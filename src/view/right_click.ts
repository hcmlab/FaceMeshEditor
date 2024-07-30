import { Editor2D } from '../editor2d';

let menuVisible = false;

/**
 * Handles right-clicking the canvas
 * @param event - jQuery's EventObject
 * @param editor - the editor which contains information if a point is hovered
 */
export async function handleCanvasRightClick(
  event: JQuery.Event,
  editor: Editor2D,
): Promise<boolean> {
  if (!editor.prepareRightClick()) {
    return true;
  }
  const container = $('#canvas-div');
  event.preventDefault();
  menuVisible = true;
  const menu_div = $('#rmb-div');
  menu_div.removeClass('d-none');

  // get click coordinates relative to the container
  const xPos = event.pageX - container.offset().left;
  const yPos = event.pageY - container.offset().top;

  // set position of div
  menu_div.css({ top: yPos, left: xPos });
  return false;
}

export async function handleCanvasLeftClick(editor: Editor2D) {
  if (!menuVisible) {
    return;
  }

  menuVisible = false;
  editor.disarmRightClick();
  $('#rmb-div').addClass('d-none');
}
