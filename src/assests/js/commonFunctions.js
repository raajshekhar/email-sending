import ENUM from "./enum";

/**
 * Focus on error element
 * @param {String} className The ClassName
 * @param {Boolean} setTimeoutRequired If setTimeout is required
*/
export const focusErrorElement = (className, setTimeoutRequired) => {
  if (!className) return;
  const scrollBehaviour = {behavior: 'smooth', block: 'center',inline: 'nearest'};
  const elements = [...document.getElementsByClassName(className)];
  if (setTimeoutRequired) {
    const element = setTimeout(function(){
      if (elements.length) elements[0].scrollIntoView(scrollBehaviour);
      clearTimeout(element);
    }, 100);
  } else {
    if (elements.length) elements[0].scrollIntoView(scrollBehaviour);
  }
};

export const trimFunction = data => typeof(data) === 'string' ? data.trim() : data;
export const trimLeftFunction = data => typeof(data) === 'string' ? data.trimLeft() : data;


export const customOnKeyPress = (e, restrictions, onKeyPress) => {
  /* Allow Alphabets Only */
  const text = String.fromCharCode(!e.charCode ? e.which : e.charCode);
  const allowAlphabets = (restrictions.includes('numbers') && restrictions.includes('special-characters')) && !ENUM.ALLOW_ALPHABETS_ONLY.test(text);
  if (allowAlphabets) return e.preventDefault();
  /* Allow Alphabets Only */

  const { value } = e.target;

  /* Removing Left space */
  if(restrictions.includes('left-space')) e.target.value = trimLeftFunction(value);
  /* Removing Left space */

  /* Trim */
  if(restrictions.includes('space')) e.target.value = trimFunction(value);
  /* Trim */

  /* Allow Numbers Only */
  const allowNumeric = (restrictions.includes('alpha') && restrictions.includes('special-characters')) && !ENUM.NUMBERS_ONLY.test(text)
  if (allowNumeric) return e.preventDefault();
  /* Allow Numbers Only */

  onKeyPress(e);
};