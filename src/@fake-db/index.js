import mock from './mock';
import './db/todo-db';
import './db/calendar-db';
import './db/mail-db';
import './db/academy-db'
mock.onAny().passThrough();
