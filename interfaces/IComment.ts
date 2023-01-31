export default interface IComment {
  id?: Number;
  body?: String;
  authorId?: Number;
  articleId?: Number;
  edited?: Number;
  likes?: Number;
  unlikes?: Number;
}
