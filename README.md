# lazy-board

Session based routing and lazy HTML importing.

## Installation

```
$ bower install lazy-board --save
```

## Usage

### Adding Page

The lazy-board element manages view state and determines a view by route path. It also initializes route path and template URL for each view element lazy-board-view wraps on attachment.
For example, the lazy-board has lazy-board-view and my-user-view elements. A HTML file in which my-user-view element is defined places at `/src/html/user/my-user-view.html`. 
We assume a user accesses to `/user` path, the lazy-board checks if the path is correct and imports a HTML file for specific custom element.

In this case, the HTML snippet becomes:

```html
<lazy-board base-url="/" source-base-url="/src/html">
  <lazy-board-view scope="/user">
    <my-user-view path="/"></my-user-view>
  </lazy-board-view>
</lazy-board>
```

When switching to the next view, the lazy-board dispatches `lazy-board-view-entry` event for custom-element. Before exiting, it dispatches `lazy-board-view-exit` as well.

To route and import by URL, configuring base URLs and view scope.

#### lazy-board

 * `base-url` is root of routing path. **(required)**
 * `source-base-url` is root of source path.  **(required)**
 * `session` is current session of the board.
 
#### lazy-board-view

 * `scope` is the directory name. **(required)**
 * `source-scope` is the directory name for source path.
 
#### custom-element

 * `path` is the subpath name. **(required)**
 * `template-url` is the URL of the HTML file.

### Using Session

The single page application (SPA) has often complex routing due to user login session (It may have more sessions, such as the current session is for user or admin...orz). To manage such a complex routing, the lazy-board implements session based routing.
For example, there is /admin view that only 'admin' session accepts and /signin view that only no-session accepts. If the `currentSession` property has no value, no one cannot see admin view but anyone can signin view. To catch unmatched session error, listen to `lazy-board-unmatched-session` event lazy-board dispatches.

```html
<lazy-board id="board" base-url="/" source-base-url="/src/html" session="[[currentSession]]">
  <lazy-board-view scope="/admin" with-session="admin">
    <my-admin-view path="/"></my-admin-view>
  </lazy-board-view>
  
  <lazy-board-view scope="/signin" without-session>
    <my-signin-view path="/"></my-signin-view>
  </lazy-board-view>
</lazy-board>

<script>
var board = document.getElementById('board');

board.addEventListener('lazy-board-unmatched-session', function (e) {
  switch (e.detail.expects) {
    case 'admin':
      console.error("Assumes 'admin' session!");
      redirectTo('/signin');
      break;
    case 'no_session':
      console.error('Assumes NO session!');
      redirectTo('/admin');
      break;
});
</script>
```

### Conclusion

```html
<lazy-board base-url="/" source-base-url="/src/html" session="[[currentSession]]">
  <lazy-board-view scope="/user">
    <my-user-profile-view path="/profile"></my-user-profile-view>
  </lazy-board-view>
  
  <lazy-board-view scope="/admin" with-session="admin">
    <my-admin-view path="/"></my-admin-view>
  </lazy-board-view>
  
  <lazy-board-view scope="/signin" without-session>
    <my-signin-view path="/"></my-signin-view>
  </lazy-board-view>
</lazy-board>
```

## License

MIT
