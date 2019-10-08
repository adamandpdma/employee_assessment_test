import CheckPropTypes from 'check-prop-types';

export const findByTestAtrr = (component,attr) =>{
    const wrapper = component.find(`[data-test='${attr}']`)
    return wrapper;
}

export const checkProps =(component, expectedProps) =>{
    const propsErr = CheckPropTypes(component.propsTypes,expectedProps, 'props',component.name)
    return propsErr
}