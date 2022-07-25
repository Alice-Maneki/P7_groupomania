/* a toast is a notification component that captures the user’s attention. */
import { toast } from 'react-toastify';


export const toastArticlePosted = () => toast.success("Article publié !");
export const toastArticleDeleted = () => toast.success("Article Supprimé !");

