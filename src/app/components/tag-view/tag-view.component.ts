import { Component, Output, EventEmitter } from '@angular/core';
import { MailService } from '../../providers/mail.service';
import { Observable } from 'rxjs/Observable';
import { TreeModel, Ng2TreeSettings, NodeSelectedEvent } from 'ng2-tree';
import * as _ from 'lodash';

@Component({
  selector: 'tag-view',
  templateUrl: './tag-view.component.html',
  styleUrls: ['./tag-view.component.scss']
})
export class TagViewComponent {

  @Output() onTagSelected: EventEmitter<any> = new EventEmitter();

  private tags$: Observable<TreeModel>;

  private settings: Ng2TreeSettings = {
    rootIsVisible: false
  };

  constructor(private mailService: MailService) {
    this.tags$ = mailService.getTags()
      .reduce((acc, tag) => {

        const names = tag.key.split('/');
        names.reduce((currentChildren, name) => {
          let child = _.first(currentChildren.filter((child) => child.value == name))
          if (!child) {
            child = {
              value: name,
              id: tag.key,
              settings: {
                cssClasses: {
                  'expanded': 'fa fa-caret-down fa-lg',
                  'collapsed': 'fa fa-caret-right fa-lg',
                  'leaf': 'fa fa-lg',
                  'empty': 'fa fa-caret-right disabled'
                },
                templates: {
                  'node': '<i class="fa fa-folder-o fa-lg"></i>',
                  'leaf': '<i class="fa fa-file-o fa-lg"></i>',
                  'leftMenu': '<i class="fa fa-navicon fa-lg"></i>'
                },
                static: true
              },
              children: []
            };
            currentChildren.push(child);
          }

          return child.children;
        }, acc.children);

        return acc;
      }, { value: "Mail" , children: []});
  }

  handleSelected(event: NodeSelectedEvent) {
    this.onTagSelected.emit(event.node.id);
  }

}
