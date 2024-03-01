export const dispatcher = async (dispatch, action, payload) => {
    const result = await dispatch(action(payload))
    if (result.type.includes('rejected'))
        dispatcher(dispatch, action, payload)
}