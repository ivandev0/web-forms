function getTemplateRootNode(scriptId) {
    let div = document.createElement('div');
    let scriptTag = document.getElementById(scriptId);
    div.innerHTML = scriptTag.innerHTML;
    let result = div.children[0];
    div.removeChild(result);
    return result;
}

export default function templateEngine(data) {
    let root = getTemplateRootNode('template');

    let date = root.querySelector('.item_date');
    let expenses = root.querySelector('.item_expenses');
    let comment = root.querySelector('.item_comment');
    let deleteBut = root.querySelector('.item_delete');
    let saveBut = root.querySelector('.item_save');
    let changeBut = root.querySelector('.item_change');
    let form = root.querySelector('.item_form');

    date.value = data.date;
    expenses.value = data.expenses;
    comment.value = data.comment;

    return {
        root: root,
        date: date,
        expenses: expenses,
        comment: comment,
        deleteBut: deleteBut,
        saveBut: saveBut,
        changeBut: changeBut,
        form: form,
    };
}