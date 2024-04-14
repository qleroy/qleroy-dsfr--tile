/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
import { t, validateNonEmpty } from '@superset-ui/core';
import { ControlPanelConfig, sharedControls } from '@superset-ui/chart-controls';

const config: ControlPanelConfig = {
  /**
   * The control panel is split into two tabs: "Query" and
   * "Chart Options". The controls that define the inputs to
   * the chart data request, such as columns and metrics, usually
   * reside within "Query", while controls that affect the visual
   * appearance or functionality of the chart are under the
   * "Chart Options" section.
   *
   * There are several predefined controls that can be used.
   * Some examples:
   * - groupby: columns to group by (translated to GROUP BY statement)
   * - series: same as groupby, but single selection.
   * - metrics: multiple metrics (translated to aggregate expression)
   * - metric: sane as metrics, but single selection
   * - adhoc_filters: filters (translated to WHERE or HAVING
   *   depending on filter type)
   * - row_limit: maximum number of rows (translated to LIMIT statement)
   *
   * If a control panel has both a `series` and `groupby` control, and
   * the user has chosen `col1` as the value for the `series` control,
   * and `col2` and `col3` as values for the `groupby` control,
   * the resulting query will contain three `groupby` columns. This is because
   * we considered `series` control a `groupby` query field and its value
   * will automatically append the `groupby` field when the query is generated.
   *
   * It is also possible to define custom controls by importing the
   * necessary dependencies and overriding the default parameters, which
   * can then be placed in the `controlSetRows` section
   * of the `Query` section instead of a predefined control.
   *
   * import { validateNonEmpty } from '@superset-ui/core';
   * import {
   *   sharedControls,
   *   ControlConfig,
   *   ControlPanelConfig,
   * } from '@superset-ui/chart-controls';
   *
   * const myControl: ControlConfig<'SelectControl'> = {
   *   name: 'secondary_entity',
   *   config: {
   *     ...sharedControls.entity,
   *     type: 'SelectControl',
   *     label: t('Secondary Entity'),
   *     mapStateToProps: state => ({
   *       sharedControls.columnChoices(state.datasource)
   *       .columns.filter(c => c.groupby)
   *     })
   *     validators: [validateNonEmpty],
   *   },
   * }
   *
   * In addition to the basic drop down control, there are several predefined
   * control types (can be set via the `type` property) that can be used. Some
   * commonly used examples:
   * - SelectControl: Dropdown to select single or multiple values,
       usually columns
   * - MetricsControl: Dropdown to select metrics, triggering a modal
       to define Metric details
   * - AdhocFilterControl: Control to choose filters
   * - CheckboxControl: A checkbox for choosing true/false values
   * - SliderControl: A slider with min/max values
   * - TextControl: Control for text data
   *
   * For more control input types, check out the `incubator-superset` repo
   * and open this file: superset-frontend/src/explore/components/controls/index.js
   *
   * To ensure all controls have been filled out correctly, the following
   * validators are provided
   * by the `@superset-ui/core/lib/validator`:
   * - validateNonEmpty: must have at least one value
   * - validateInteger: must be an integer value
   * - validateNumber: must be an integer or decimal value
   */

  // For control input types, see: superset-frontend/src/explore/components/controls/index.js
  controlPanelSections: [
    {
      label: t('Query'),
      expanded: true,
      controlSetRows: [
        [
          {
            name: 'cols',
            config: {
              ...sharedControls.groupby,
              label: t('Columns'),
              description: t('Columns to group by'),
            },
          },
        ],
        [
          {
            name: 'metrics',
            config: {
              ...sharedControls.metrics,
              // it's possible to add validators to controls if
              // certain selections/types need to be enforced
              validators: [validateNonEmpty],
            },
          },
        ],
        ['adhoc_filters'],
        [
          {
            name: 'row_limit',
            config: sharedControls.row_limit,
          },
        ],
      ],
    },
    {
      label: t('Hello Controls!'),
      expanded: true,
      controlSetRows: [
        [
          {
            name: 'tile_url',
            config: {
              type: 'TextControl',
              default: '/',
              renderTrigger: true,
              // ^ this makes it apply instantaneously, without triggering a "run query" button
              label: t('Tile url'),
              description: t('Tile url'),
            },
          },
        ],
        [
          {
            name: 'tile_title',
            config: {
              type: 'TextControl',
              default: 'Intitulé de la title',
              renderTrigger: true,
              // ^ this makes it apply instantaneously, without triggering a "run query" button
              label: t('Tile title'),
              description: t('Tile title'),
            },
          },
        ],
        [
          {
            name: 'tile_description',
            config: {
              type: 'TextControl',
              default: 'Description',
              renderTrigger: true,
              // ^ this makes it apply instantaneously, without triggering a "run query" button
              label: t('Tile description'),
              description: t('Tile description'),
            },
          },
        ],
        [
          {
            name: 'tile_detail',
            config: {
              type: 'TextControl',
              default: 'Detail',
              renderTrigger: true,
              // ^ this makes it apply instantaneously, without triggering a "run query" button
              label: t('Tile detail'),
              description: t('Tile detail'),
            },
          },
        ],
        [
          {
            name: 'pictogram_path',
            config: {
              type: 'SelectControl',
              label: t('Pictogram path'),
              renderTrigger: true,
              default: 'buildings/city-hall',
              choices: [
                ["buildings/city-hall", "buildings/city-hall"],
                ["buildings/factory", "buildings/factory"],
                ["buildings/house", "buildings/house"],
                ["buildings/nuclear-plant", "buildings/nuclear-plant"],
                ["buildings/school", "buildings/school"],
                ["digital/application", "digital/application"],
                ["digital/avatar", "digital/avatar"],
                ["digital/calendar", "digital/calendar"],
                ["digital/coding", "digital/coding"],
                ["digital/data-visualization", "digital/data-visualization"],
                ["digital/internet", "digital/internet"],
                ["digital/mail-send", "digital/mail-send"],
                ["digital/search", "digital/search"],
                ["document/contract", "document/contract"],
                ["document/document-add", "document/document-add"],
                ["document/document-download", "document/document-download"],
                ["document/document-signature", "document/document-signature"],
                ["document/document", "document/document"],
                ["document/driving-licence", "document/driving-licence"],
                ["document/national-identity - card", "document/national-identity - card"],
                ["document/passport", "document/passport"],
                ["document/tax-stamp", "document/tax-stamp"],
                ["document/vehicle-registration", "document/vehicle-registration"],
                ["environment/environment", "environment/environment"],
                ["environment/food", "environment/food"],
                ["environment/grocery", "environment/grocery"],
                ["environment/human-cooperation", "environment/human-cooperation"],
                ["environment/leaf", "environment/leaf"],
                ["environment/moon", "environment/moon"],
                ["environment/mountain", "environment/mountain"],
                ["environment/sun", "environment/sun"],
                ["environment/tree", "environment/tree"],
                ["health/health", "health/health"],
                ["health/hospital", "health/hospital"],
                ["health/vaccine", "health/vaccine"],
                ["health/virus", "health/virus"],
                ["institutions/firefighter", "institutions/firefighter"],
                ["institutions/gendarmerie", "institutions/gendarmerie"],
                ["institutions/justice", "institutions/justice"],
                ["institutions/money", "institutions/money"],
                ["institutions/police", "institutions/police"],
                ["leisure/book", "leisure/book"],
                ["leisure/community", "leisure/community"],
                ["leisure/culture", "leisure/culture"],
                ["leisure/digital-art", "leisure/digital-art"],
                ["leisure/paint", "leisure/paint"],
                ["map/airport", "map/airport"],
                ["map/location-france", "map/location-france"],
                ["map/luggage", "map/luggage"],
                ["map/map", "map/map"],
                ["system/connection - lost", "system/connection - lost"],
                ["system/error", "system/error"],
                ["system/information", "system/information"],
                ["system/notification", "system/notification"],
                ["system/padlock", "system/padlock"],
                ["system/success", "system/success"],
                ["system/system", "system/system"],
                ["system/technical - error", "system/technical - error"],
                ["system/warning", "system/warning"],
              ],
              description: t('Description'),
            },
          },
        ],
        [
          {
            name: 'pictogram_category',
            config: {
              type: 'SelectControl',
              label: t('Category'),
              renderTrigger: true,
              default: 'buildings',
              choices: [
                ['buildings', t('buildings')],
                ['digital', t('digital')],
                ['document', t('document')],
                ['environment', t('environment')],
                ['health', t('health')],
                ['institutions', t('institutions')],
                ['leisure', t('leisure')],
                ['map', t('map')],
                ['system', t('system')],
              ],
              description: t('Category'),
            },
          },
        ],
        [
          {
            name: 'pictogram_name',
            config: {
              type: 'TextControl',
              default: 'Pictogramme name',
              renderTrigger: true,
              // ^ this makes it apply instantaneously, without triggering a "run query" button
              label: t('Pictogramme name'),
              description: t('Pictogramme name'),
            },
          },
        ],
        [
          {
            name: 'header_font_size',
            config: {
              type: 'SelectControl',
              label: t('Font Size'),
              default: 'xl',
              choices: [
                // [value, label]
                ['xxs', 'xx-small'],
                ['xs', 'x-small'],
                ['s', 'small'],
                ['m', 'medium'],
                ['l', 'large'],
                ['xl', 'x-large'],
                ['xxl', 'xx-large'],
              ],
              renderTrigger: true,
              description: t('The size of your header font'),
            },
          },
        ],
      ],
    },
  ],
};

export default config;
