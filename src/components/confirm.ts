export default (title: string, content: string): Promise<boolean> => new Promise((resolve) => {
    window.$dialog.info({
        title,
        content,
        positiveText: '确定',
        negativeText: '取消',
        closeOnEsc: true,
        onPositiveClick: () => resolve(true),
        onNegativeClick: () => resolve(false), 
        onMaskClick: () => resolve(false),
        onClose: () => resolve(false),
    })
})