function getTemplateRootNode(scriptId) {
    var div = document.createElement('div');
    var scriptTag = document.getElementById(scriptId);
    div.innerHTML = scriptTag.innerHTML;
    var result = div.children[0];
    div.removeChild(result);
    return result;
}

export default function templateEngine(data) {
    var root = getTemplateRootNode('template');

    var date = root.querySelector('.item_date');
    var expenses = root.querySelector('.item_expenses');
    var comment = root.querySelector('.item_comment');
    var deleteBut = root.querySelector('.item_delete');
    var saveBut = root.querySelector('.item_save');
    var changeBut = root.querySelector('.item_change');

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
        changeBut: changeBut
    };
}