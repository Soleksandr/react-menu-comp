export declare type HorizontalPosition = 'left' | 'right';
export declare type VerticalPosition = 'bottom' | 'top';
export declare type VerticalAlignment = HorizontalPosition | 'center'
export declare type HorizontalAlignment = VerticalPosition | 'center'

export declare type Position = HorizontalPosition | VerticalPosition;
export declare type Alignment = HorizontalAlignment | VerticalAlignment;

export interface Indention {
  top: number;
  left: number;
}

export const pickBoxShadow = (position: Position) => {
  const sharedPart = '5px rgba(0,0,0,0.2)'
  const sharedEdgePart = '1px rgba(0,0,0,0.03)'

  let shadow;

  switch (position) {
    case 'bottom':
      shadow = `0 2px ${sharedPart} , 0 -1px ${sharedEdgePart}`
      break;
  
    case 'top':
      shadow = `0 -2px ${sharedPart}, 0 1px ${sharedEdgePart}`
      break;
  
    case 'left':
      shadow = `-2px 0 ${sharedPart}, 1px 0 ${sharedEdgePart}`
      break;
  
    case 'right':
      shadow = `2px 0 ${sharedPart}, -1px 0 ${sharedEdgePart}`
      break;
  
    default:
      shadow = `0 0 ${sharedPart}`
  }

  return shadow
}

const _calculateDefaultIndentation = (boundingAnchorRect: ClientRect, offset: number): Indention => {
  return {
    top: boundingAnchorRect.bottom + offset + window.scrollY,
    left: boundingAnchorRect.left + window.scrollX
  }
}

export const getOffset = (position: Position, isTopLeftCalculated: boolean) => {
  const offset = 10

  let top = 0;
  let left = 0;

  if (isTopLeftCalculated) {
    return { top, left }
  }

  switch (position) {
    case "top":
      top = -offset
      break;

    case "bottom":
      top = offset
      break;
  
    case "left":
      left = -offset
      break;

    case "right":
      left = offset
      break;
  }

  return { top, left }
}

export const calculateIndentation = (
  boundingAnchorRect: ClientRect, 
  boundingMenuContainerRect: ClientRect,
  position: Position,
  alignment: Alignment
): Indention => {
  let indention: Indention;
  const offset = 3;

  switch (`${position}-${alignment}`) {
    case 'bottom-left':
      indention = _calculateDefaultIndentation(boundingAnchorRect, offset);
      break;

    case 'bottom-center':
      indention = {
        top: boundingAnchorRect.bottom + window.scrollY + offset,
        left: boundingAnchorRect.left - boundingMenuContainerRect.width / 2 + boundingAnchorRect.width / 2  + window.scrollX
      }
      break;

    case 'bottom-right':
      indention = {
        top: boundingAnchorRect.bottom + offset + window.scrollY ,
        left: boundingAnchorRect.right - boundingMenuContainerRect.width + window.scrollX
      }
      break;
    
    case 'top-left':
      indention = {
        top: boundingAnchorRect.top - boundingMenuContainerRect.height - offset  + window.scrollY,
        left: boundingAnchorRect.left  + window.scrollX
      }
      break;

    case 'top-center':
      indention = {
        top: boundingAnchorRect.top - boundingMenuContainerRect.height - offset + window.scrollY,
        left: boundingAnchorRect.left - boundingMenuContainerRect.width / 2 + boundingAnchorRect.width / 2  + window.scrollX
      }
      break;

    case 'top-right':
      indention = {
        top: boundingAnchorRect.top - boundingMenuContainerRect.height - offset + window.scrollY,
        left: boundingAnchorRect.right - boundingMenuContainerRect.width  + window.scrollX
      }
      break;
    
    case 'left-top':
      indention = {
        top: boundingAnchorRect.top + window.scrollY,
        left: boundingAnchorRect.left - boundingMenuContainerRect.width - offset  + window.scrollX
      }
      break;

    case 'left-center':
      indention = {
        top: boundingAnchorRect.top - boundingMenuContainerRect.height / 2 + boundingAnchorRect.height / 2 + window.scrollY,
        left: boundingAnchorRect.left - boundingMenuContainerRect.width - offset  + window.scrollX
      }
      break;

    case 'left-bottom':
      indention = {
        top: boundingAnchorRect.bottom - boundingMenuContainerRect.height + window.scrollY,
        left: boundingAnchorRect.left - boundingMenuContainerRect.width - offset  + window.scrollX
      }
      break;
    
    case 'right-top':
      indention = {
        top: boundingAnchorRect.top + window.scrollY,
        left: boundingAnchorRect.right + offset + window.scrollX
      }
      break;

    case 'right-center':
      indention = {
        top: boundingAnchorRect.top - boundingMenuContainerRect.height / 2 + boundingAnchorRect.height / 2 + window.scrollY,
        left: boundingAnchorRect.right + offset  + window.scrollX
      }
      break;

    case 'right-bottom':
      indention = {
        top: boundingAnchorRect.bottom - boundingMenuContainerRect.height + window.scrollY,
        left: boundingAnchorRect.right + offset  + window.scrollX
      }
      break;
  
    default:
      indention = _calculateDefaultIndentation(boundingAnchorRect, offset);
  }

  return indention;
}