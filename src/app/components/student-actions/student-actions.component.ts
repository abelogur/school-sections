import {Component, EventEmitter, Inject, Input, OnInit, Output} from '@angular/core';
import {StudentService} from '../../client/student.service';
import {SectionService} from '../../client/section.service';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {Student, StudentInfo} from '../../../../commons/domain/student';
import {isUndefined} from 'util';
import 'rxjs/add/operator/filter';
import {StudentDialogComponent} from '../../dialogs/student-dialog/student-dialog.component';
import {SelectSectionsDialogComponent} from '../../dialogs/select-sections-dialog/select-sections-dialog.component';

@Component({
  selector: 'app-student-actions',
  templateUrl: './student-actions.component.html',
  styleUrls: ['./student-actions.component.css']
})
export class StudentActionsComponent implements OnInit {

  @Input() student: Student;

  @Output() deleted = new EventEmitter<number>();

  constructor(private studentService: StudentService,
              private sectionService: SectionService,
              private dialog: MatDialog) {
  }

  ngOnInit() {
  }

  showSelectSectionsForm() {
    let dialogRef = this.dialog.open(SelectSectionsDialogComponent, {
      width: '300px',
      position: {
        top: '100px'
      },
      // data: {section: this.student}
    });

    dialogRef.afterClosed().subscribe(sections => {

    });
  }

  showEditForm() {
    const studentInfo: StudentInfo = {
      firstName: this.student.firstName,
      lastName: this.student.lastName,
      classNumber: this.student.classNumber,
      classCharacter: this.student.classCharacter
    };
    let dialogRef = this.dialog.open(StudentDialogComponent, {
      width: '300px',
      position: {
        top: '100px'
      },
      data: {student: new Student(studentInfo), edit: true}
    });

    dialogRef.afterClosed()
      .filter(student => !isUndefined(student))
      .mergeMap(student => {
        student.id = this.student.id;
        return this.studentService.update(student)
      })
      .mergeMap(id => this.studentService.get(id))
      .subscribe(student => this.refreshStudent(student));
  }

  delete(studentId: number) {
    this.studentService.delete(studentId).subscribe(() => {
      this.deleted.emit(studentId);
    });
  }

  private refreshStudent(student: Student) {
    this.student.firstName = student.firstName;
    this.student.lastName = student.lastName;
    this.student.classNumber = student.classNumber;
    this.student.classCharacter = student.classCharacter;
  }
}
