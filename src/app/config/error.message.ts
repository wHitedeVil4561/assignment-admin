function toFirstCharacterUpper(inputstring: string) {
  return inputstring.charAt(0).toUpperCase() + inputstring.substring(1);
}
export type ErrorTypes =
  | 'required'
  | 'email'
  | 'minlength'
  | 'invalidDate'
  | 'invalidYear'
  | 'maxlength'
  | 'pattern'
  | 'matDatepickerMin'
  | 'min';

export const ERROR_MESSAGES: { [key: string]: (...args: any) => string } = {
  required: (formControlName: string) => { 
    let  controlName:any = formControlName.split(':');
    let type = 'enter';
    if(controlName.length >1){
      type ='select';
      controlName.splice(controlName.length - 1 , 1)
      controlName = controlName.join(' ')
    }

    return formControlName.toLowerCase().includes('table-input')?'*Required': `Please ${type} ${controlName}.`
  },
  email: () => `Plese enter valid email address.`,
  minlength: (formControlName, requirement) => { return formControlName.toLowerCase().includes('table-input')?`Min ${requirement} char.`:`${toFirstCharacterUpper(
      formControlName
    )} should be at least ${requirement} char long.`}
    ,
  maxlength: (formControlName, requirement) => { return formControlName.toLowerCase().includes('table-input')?`Max ${requirement} char`: `${toFirstCharacterUpper(
      formControlName
    )} should at equal to or less than ${requirement} char.`}
    ,
  pattern: (formControlName) => {
    console.log(formControlName)
    let res:string
    switch (true){
      case formControlName.toLowerCase().includes('password'):
        res = `Password should contain at least one uppercase, one lowercase, one digit, one special character and minimum 8 characters.`
        break;
      case formControlName.toLowerCase().includes('table-input'):
        console.log('table-input')
        res = `Valid ${formControlName.split('-').slice(-1)}.`
        break;
      default:
        res = `Please enter valid ${formControlName}.`;
    }
    return res
  },
  min:(formControlName, requirement)=>{return formControlName.toLowerCase().includes('table-input')?`Min ₹ ${requirement}`:`${formControlName} should be min ₹ ${requirement}`}
};
