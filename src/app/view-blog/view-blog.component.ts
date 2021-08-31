import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService } from '../service/blog.service';
import { Blog } from '../model/blog';

@Component({
  selector: 'app-view-blog',
  templateUrl: './view-blog.component.html',
  styleUrls: ['./view-blog.component.scss']
})
export class ViewBlogComponent implements OnInit {
  currentBlog: Blog;
  id: number;
  constructor(private activeRoter: ActivatedRoute, private blogService: BlogService, private router: Router) { }

  ngOnInit(): void {
    this.id = +this.activeRoter.snapshot.paramMap.get('id');
    this.getBlog(this.id);
  }

  getBlog(id: number) {
    this.blogService.getBlogs().subscribe(data =>
      this.currentBlog = data?.find(o => o.id == id)
    );
    console.log(this.currentBlog);
  }
  onEdit() {
    this.router.navigate(['create-blog', this.id]);
  }
}
