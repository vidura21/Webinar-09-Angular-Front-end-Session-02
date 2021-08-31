import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BlogService } from '../service/blog.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Blog } from '../model/blog';

@Component({
  selector: 'app-create-blog',
  templateUrl: './create-blog.component.html',
  styleUrls: ['./create-blog.component.scss']
})
export class CreateBlogComponent implements OnInit {
  id: number;
  currentBlog: Blog;

  blogForm = new FormGroup({
    id: new FormControl(),
    title: new FormControl('', Validators.required),
    date: new FormControl(),
    imgUrl: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required)
  })
  constructor(private blogService: BlogService, private router: Router, private activeRoter: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = +this.activeRoter.snapshot.paramMap.get('id');
    if (this.id) {
      this.getBlog(this.id);
    }
  }

  onFormSubmit() {
    if (this.blogForm.valid) {
      if (!this.id) {
        this.blogForm.controls.id.setValue(this.getId() + 1);
        this.blogForm.controls.date.setValue(new Date());
        this.blogService.addBlog(this.blogForm.value)
        this.router.navigate([''])
      } else {
        debugger
        this.blogService.editBlog(this.blogForm.value);
        this.router.navigate([''])
      }
    } else {
      console.log(this.blogForm.valid)
    }
  }

  getId() {
    return Math.max.apply(Math, this.blogService.blogs.map(function (o) { return o.id; }))
  }

  get imageUrl() {
    return this.blogForm.value.imgUrl;
  }

  getBlog(id: number) {
    this.blogService.getBlogs().subscribe(data => {
      this.currentBlog = data?.find(o => o.id == id)
      this.blogForm.controls.id.setValue(this.currentBlog.id);
      this.blogForm.controls.date.setValue(this.currentBlog.date);
      this.blogForm.controls.title.setValue(this.currentBlog.title);
      this.blogForm.controls.description.setValue(this.currentBlog.description);
      this.blogForm.controls.imgUrl.setValue(this.currentBlog.imgUrl);
    });
  }
}
