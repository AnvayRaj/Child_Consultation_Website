window.addEventListener('load', () => {
	comments = JSON.parse(localStorage.getItem('comments')) || [];
	const nameInput = document.querySelector('#name');
	const newCommentForm = document.querySelector('#new-comment-form');

	const username = localStorage.getItem('username') || '';

	nameInput.value = username;

	nameInput.addEventListener('change', (e) => {
		localStorage.setItem('username', e.target.value);
	})

	newCommentForm.addEventListener('submit', e => {
		e.preventDefault();

		const comment = {
			content: e.target.elements.content.value,
			category: e.target.elements.category.value,
			done: false,
			createdAt: new Date().getTime()
		}

		comments.push(comment);

		localStorage.setItem('comments', JSON.stringify(comments));

		// Reset the form
		e.target.reset();

		DisplayComments()
	})

	DisplayComments()
})

function DisplayComments () {
	const commentList = document.querySelector('#comment-list');
	commentList.innerHTML = "";

	comments.forEach(comment => {
		const commentItem = document.createElement('div');
		commentItem.classList.add('comment-item');

		const label = document.createElement('label');
		const input = document.createElement('input');
		const span = document.createElement('span');
		const content = document.createElement('div');
		const actions = document.createElement('div');
		const edit = document.createElement('button');
		const deleteButton = document.createElement('button');

		input.type = 'checkbox';
		input.checked = comment.done;
		span.classList.add('bubble');
		if (comment.category == 'child') {
			span.classList.add('child');
		} else {
			span.classList.add('parent');
		}
		content.classList.add('comment-content');
		actions.classList.add('actions');
		edit.classList.add('edit');
		deleteButton.classList.add('delete');

		content.innerHTML = `<input type="text" value="${comment.content}" readonly>`;
		edit.innerHTML = 'Edit';
		deleteButton.innerHTML = 'Delete';

		label.appendChild(input);
		label.appendChild(span);
		actions.appendChild(edit);
		actions.appendChild(deleteButton);
		commentItem.appendChild(label);
		commentItem.appendChild(content);
		commentItem.appendChild(actions);

		commentList.appendChild(commentItem);

		if (comment.done) {
			commentItem.classList.add('done');
		}
		
		input.addEventListener('change', (e) => {
			comment.done = e.target.checked;
			localStorage.setItem('comments', JSON.stringify(comments));

			if (comment.done) {
				commentItem.classList.add('done');
			} else {
				commentItem.classList.remove('done');
			}

			DisplayComments()

		})

		edit.addEventListener('click', (e) => {
			const input = content.querySelector('input');
			input.removeAttribute('readonly');
			input.focus();
			input.addEventListener('blur', (e) => {
				input.setAttribute('readonly', true);
				comment.content = e.target.value;
				localStorage.setItem('comments', JSON.stringify(comments));
				DisplayComments()

			})
		})

		deleteButton.addEventListener('click', (e) => {
			comments = comments.filter(t => t != comment);
			localStorage.setItem('comments', JSON.stringify(comments));
			DisplayComments()
		})

	})
}