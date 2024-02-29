export default (title: string, content: string, type?: "default" | "error" | "info" | "success" | "warning"): Promise<boolean> => new Promise((resolve) => {
    window.$dialog.create({
        title,
        content,
        positiveText: '确定',
        negativeText: '取消',
        type: type ?? 'warning',
        closeOnEsc: true,
        onPositiveClick: () => resolve(true),
        onNegativeClick: () => resolve(false), 
        onMaskClick: () => resolve(false),
        onClose: () => resolve(false),
    })
})