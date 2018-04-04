function getTemplateRootNode(scriptId) {
    var tr = document.createElement('tr');
    tr.classList.add('item');
    var scriptTag = document.getElementById(scriptId);
    tr.innerHTML = scriptTag.innerHTML;
    return tr;
}

export default function templateEngine(data) {
    var root = getTemplateRootNode('template');

    var date = root.querySelector('.date');
    var expenses = root.querySelector('.expenses');
    var comment = root.querySelector('.comment');
    var deleteBut = root.querySelector('.delete');

    var errors = root.getElementsByClassName('error');

    date.value = data.date;
    expenses.innerHTML = data.expenses;
    comment.innerHTML = data.comment;

    return {
        root: root,
        date: date,
        expenses: expenses,
        comment: comment,
        deleteBut: deleteBut,
        errors: errors
    };
}